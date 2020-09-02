const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pd = require("./pd.model.js")(sequelize, Sequelize);
db.ad = require("./ad.model.js")(sequelize, Sequelize);
db.dd = require("./dd.model.js")(sequelize, Sequelize);
db.sao = require("./saao.model")(sequelize, Sequelize);
db.upazilla = require("./upazilla.model.js")(sequelize, Sequelize);
db.trainedfarmer = require("./trainedFarmer.js")(sequelize, Sequelize);
db.initialtrial = require("./initialtrial.js")(sequelize, Sequelize);
db.TrialProgress = require("./trialProgress.js")(sequelize, Sequelize);
db.finaltrial = require("./finaltrial.js")(sequelize, Sequelize);
db.upazillatable = require("./upazillatable.js")(sequelize, Sequelize);
db.BreedExpansion = require("./breedExpansion.js")(sequelize, Sequelize);
db.CropExpansion = require("./cropExpansion.js")(sequelize, Sequelize);
db.TechnologyExpansion = require("./technologyExpansion.js")(sequelize, Sequelize);

module.exports = db;