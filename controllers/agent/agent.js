import { Ticket } from '../../models';
import {
  queryRelationship,
  ticketStatusTypes
} from '../../utils/constants';

export async function getAssignedTickets(req, res) {
  try {
    const tickets = await Ticket.findAll({
      where: {
        assignedTo: req.user.id,
        status: ticketStatusTypes.OPEN
      },
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

export async function updateTicketStatus(req, res) {
  try {

    const { status } = req.body;

    if (!status) {
      return res.status(400).send({
        error: 'status is required'
      });
    }

    if (!ticketStatusTypes[status.toUpperCase()]) {
      return res.status(400).send({
        error: 'Invalid status'
      });
    }

    const ticket = await Ticket.findOne({
      where: {
        assignedTo: req.user.id,
        id: req.params.ticketId
      }
    });

    if (!ticket) {
      return res.status(404).send({
        error: 'Could not find this ticket. Perhaps it has been resolved already'
      });
    }

    await ticket.update({
      status: ticketStatusTypes.CLOSED
    });

    res.status(200).send({
      message: 'Successfully updated resolved status'
    });

  } catch (error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}
