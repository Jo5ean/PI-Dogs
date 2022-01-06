const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// [ ] Temperamento con las siguientes propiedades:
// ID
// Nombre


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temp', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true, //consultar si hace falta que sea primary key aca <--------
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};