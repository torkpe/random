'use strict';
import { ticketStatusTypes } from '../utils/constants';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Tickets', 'isResolved'),
      queryInterface.addColumn(
        'Tickets',
        'status',
        {
          type: Sequelize.STRING,
          defaultValue: ticketStatusTypes.OPEN
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
