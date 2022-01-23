const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { dbCreds } = require('../config');

const db = {};
let sequelize = new Sequelize(dbCreds.database, dbCreds.username, dbCreds.password, dbCreds);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  }, function (err) {
    console.log('Failed to create tables and sync db', err);

  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;