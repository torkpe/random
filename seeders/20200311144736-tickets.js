'use strict';
import { ticketStatusTypes } from '../utils/constants'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {
        title: 'some text',
        body: 'Some body',
        createdBy: 100,
        createdAt: Sequelize.fn('NOW'),
        assignedTo: null,
        status: ticketStatusTypes.OPEN
      },
      {
        title: 'some1 text',
        body: 'Some body',
        createdBy: 100,
        createdAt: Sequelize.fn('NOW'),
        assignedTo: null,
        status: ticketStatusTypes.OPEN
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
