const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Note = require('./Note')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);
db.NoteCategory = require('./NoteCategory')(sequize, Sequelize);

// Define associations
db.User.hasMany(db.Note, { foreignKey: 'userId', as: 'notes' });
db.Note.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Note.belongsToMany(db.Category, {
  through: db.NoteCategory,
  foreignKey: 'noteId',
  as: 'categories'
});

db.Category.belongsToMany(db.Note, {
  through: db.NoteCategory,
  foreignKey: 'categoryId',
  as: 'notes'
});

db.User.hasMany(db.Category, { foreignKey: 'userId', as: 'categories' });
db.Category.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
