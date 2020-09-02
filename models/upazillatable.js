module.exports = (sequelize, Sequelize) => {
    const upazillatable = sequelize.define("upazillatable", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return upazillatable;
  };