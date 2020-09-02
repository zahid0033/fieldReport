module.exports = (sequelize, Sequelize) => {
    const TrialProgress = sequelize.define("TrialProgress", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      boraddo: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.STRING
      },
      breed: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return TrialProgress;
  };