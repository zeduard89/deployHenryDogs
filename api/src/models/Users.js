const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
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
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // para evitar duplicados
      validate: {
        isEmail: true // para validar que sea un email
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100] // establece una longitud mínima de 8 caracteres
      },
    }

  },{timestamps: false}
  );
};