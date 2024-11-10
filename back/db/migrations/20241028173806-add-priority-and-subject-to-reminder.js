'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reminder', 'priority', {
      type: Sequelize.STRING // or Sequelize.INTEGER
    });
    await queryInterface.addColumn('reminder', 'subject', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reminder', 'priority');
    await queryInterface.removeColumn('reminder', 'subject');
  }
};