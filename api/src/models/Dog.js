const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bred_for:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minHeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxHeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minWeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxWeight:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },image:{
      type: DataTypes.STRING,
      allowNull: false,
    }

  });
};
