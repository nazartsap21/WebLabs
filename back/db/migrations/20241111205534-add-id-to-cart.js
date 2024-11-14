'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Carts', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    });
    await queryInterface.changeColumn('Carts', 'reminderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Carts', 'id');
    await queryInterface.changeColumn('Carts', 'reminderId', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    });
  }
};