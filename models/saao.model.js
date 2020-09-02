module.exports = (sequelize, Sequelize) => {
    const saao = sequelize.define("saao", {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      district: {
        type: Sequelize.STRING
      },
      upazilla: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      field: {
        type: Sequelize.STRING
      },
      block: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      joining_date: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
      
    });
  
    return saao;
  };