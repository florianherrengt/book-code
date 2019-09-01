import { QueryInterface } from "sequelize";

module.exports = {
  // change the database schema
  async up(query: QueryInterface) {
    await query.renameColumn("link", "url", "uri");
  },

  // revert in case it goes wrong
  async down(query: QueryInterface) {
    await query.renameColumn("link", "uri", "url");
  }
};
