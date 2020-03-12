import sequelize, { Op } from 'sequelize';
import { Parser } from 'json2csv';
import { User, Ticket } from '../../models';

import {
  userTypes,
  queryRelationship,
  ticketStatusTypes
} from '../../utils/constants';

export async function getUsers(req, res, next) {
  try {
    const query = {
      type: { [Op.ne]: userTypes.ADMIN }
    }

    if (req.query.type) {
      query.type = req.query.type.toUpperCase()
    }

    const users = await User.findAll({
      where: query,
      attributes: ['id', 'name', 'email', 'type']
    });

    return res.status(200).send({
      data: users
    });

  } catch (error) {
    next(error);
  }
}

export async function getTickets(req, res, next) {
  try {
    const query = {}
    const { status } = req.query;

    if (status) {
      query.status = status.toUpperCase();
    }

    const tickets = await Ticket.findAll({
      where: query,
      ...queryRelationship
    });

    res.status(200).send({
      data: tickets
    });
  } catch (error) {
    next(error);
  }
}

export async function assignTicket(req, res, next) {
  try {
    const { ticketId } = req.params;
    const { agentId } = req.body;

    if (typeof(agentId) !== 'number') {
      return res.status(400).send({
        error: 'agentId is required and should be a number'
      });
    }

    const ticket = await Ticket.findOne({
      where: {
        id: ticketId,
        status: ticketStatusTypes.OPEN
      }
    });

    if (!ticket) {
      return res.status(404).send({
        error: 'Could not find this ticket. Perhaps it\'s been resolved'
      });
    }

    if (ticket.assignedTo === agentId) {
      return res.status(409).send({
        error: 'Already assigned this ticket to this agent'
      });
    }

    const user = await User.findOne({
      id: agentId,
      type: userTypes.AGENT
    });

    if (!user) {
      return res.status(404).send({
        error: 'Could not find an agent with this id'
      });
    }

    await ticket.update({
      assignedTo: agentId
    });

    res.status(200).send({
      message: 'Successfully assigned ticket'
    });

  } catch (error) {
    next(error);
  }
}

export async function getReport(req, res, next) {
  try {
    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize
              .fn('datediff', sequelize.fn("NOW") , sequelize.col('Ticket.createdAt')), {
            [Op.lte] : 30
          }),
        ]
      },
      include: [
        {
          model: User,
          as: 'createdByDetails',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'assignedToDetails',
          attributes: ['name'],
        }
      ]
    });

    const fields = [
      {label: 'Ticket No.', value: 'id'},
      {label: 'Title', value: 'title'},
      {label: 'Created by', value: 'createdByDetails.name'},
      {label: 'Assigned to', value: 'assignedToDetails.name'},
      {label: 'Status', value: 'status'},
    ];

    const json2csvParser = new Parser({ fields, delimiter: '\t', quote: ''});
    const data = json2csvParser.parse(tickets);
    res.attachment('report.csv');
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
}