module.exports = (sequelize, Sequelize) => {
    const initialtrial = sequelize.define("initialtrial", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING
      },
      vname: {
        type: Sequelize.STRING
      },
      nid: {
        type: Sequelize.STRING
      },
      mnum: {
        type: Sequelize.STRING
      },
      cdistribution: {
        type: Sequelize.STRING
      },
      pdistribution: {
        type: Sequelize.STRING
      },
      ptype: {
        type: Sequelize.STRING
      },
      pname: {
        type: Sequelize.STRING
      },
      breedname: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      trialsize : {
        type: Sequelize.STRING
      },
      trialdate : {
        type: Sequelize.STRING
      },
      blockname  : {
        type: Sequelize.STRING
      },
      saaoname  : {
        type: Sequelize.STRING
      },
      pnum: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return initialtrial;
  };