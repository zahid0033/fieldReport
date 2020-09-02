module.exports = (sequelize, Sequelize) => {
    const CropExpansion = sequelize.define("CropExpansion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      
      area: {
        type: Sequelize.STRING
      },
      
      folon: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return CropExpansion;
  };