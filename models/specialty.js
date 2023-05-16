const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Specialty extends Model {}

Specialty.init(
{
id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
},
name: {
    type: DataType.STRING,
    allowNull: false,
},
},
{
    sequelize,
    timestamps:false,
    freezeTableName: true,
    underscored:true,
    modelName: 'specialty',
}
);

module.exports = Specialty;