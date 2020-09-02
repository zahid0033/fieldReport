module.exports = (sequelize, Sequelize) => {
    const BreedExpansion = sequelize.define("BreedExpansion", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      },
      bname: {
        type: Sequelize.STRING
      },
      
      area: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      upazilla_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return BreedExpansion;
  };