import { QueryInterface } from "sequelize";

module.exports = {
  // change the database schema
  async up(query: QueryInterface) {
    // add migration here
    return;
  },

  // revert in case it goes wrong
  async down(query: QueryInterface) {
    // revert
    return;
  }
};
