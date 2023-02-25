const Sequelize = require("sequelize");

const username = "rajesh";
const password = "uni1ver@se";
const database = "whatsappbackend";

const dbconfig = {
  host: "sql12.freemysqlhosting.net",
  port: "3306",
  dialect: "mysql",
  logging: false,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 300,
    min: 1,
    idle: 10000,
  },
};

const sequelize = new Sequelize(database, username, password, dbconfig);

module.exports = sequelize;
