import { Ticket } from '../../models';
import {
  queryRelationship,
  ticketStatusTypes
} from '../../utils/constants';

export async function getTickets(req, res) {
  try {
    const query = {
      createdBy: req.user.id
    }

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
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}

export async function createTicket(req, res) {
  try {
    const ticket = await Ticket.findOne({
      where: {
        title: req.sanitizedBody.title,
        createdBy: req.user.id
      }
    });

    if (ticket) {
      return res.status(409).send({
        error: 'You currently have an unresolved ticket with this title.'
      });
    }

    await Ticket.create(req.sanitizedBody);

    res.status(200).send({
      message: 'Successfully created ticket'
    });

  } catch (error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}

