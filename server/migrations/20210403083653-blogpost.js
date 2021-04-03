"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("blogpost", {
      title: {
        type: Sequelize.TEXT,
      },
      metatitle: {
        type: Sequelize.TEXT,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      publishedAt: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.BLOB,
      },
      editedAt: {
        type: Sequelize.DATE,
      },
      editedBy: {
        type: Sequelize.INTEGER,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      entryType: {
        type: Sequelize.CHAR,
      },
      seoTags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("blogpost");
  },
};
