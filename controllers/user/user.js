import { Ticket } from '../../models';
import {
  queryRelationship,
} from '../../utils/constants';
import {
  EntryExistError,
} from '../../utils/errors';

export async function getTickets(req, res, next) {
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
    next(error);
  }
}

export async function createTicket(req, res, next) {
  try {
    const ticket = await Ticket.findOne({
      where: {
        title: req.sanitizedBody.title,
        createdBy: req.user.id
      }
    });

    if (ticket) {
      throw new EntryExistError('You currently have an unresolved ticket with this title.');
    }

    await Ticket.create(req.sanitizedBody);

    res.status(200).send({
      message: 'Successfully created ticket'
    });

  } catch (error) {
    next(error);
  }
}

