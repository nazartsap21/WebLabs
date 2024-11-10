'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reminder', 'priority');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reminder', 'priority', {
      type: Sequelize.STRING
    });
  }
};