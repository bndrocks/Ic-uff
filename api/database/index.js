const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const startDatabase = async () => {
  await sequelize.authenticate();
}

module.exports = { startDatabase };