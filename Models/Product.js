// import important parts of squelize library 
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off 'Sequelize's Model Class
class Product extends Model {}

Product.init (
    {
        id: {
            type: DATATYPES.INTERGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },
        product_name: {
            type: DATATYPES.STRING,
            allowNull: false,
        },
        price: {
            type: DATATYPES.DECIMAL(10, 2),
            allowNull: false, 
            validate: {
                isDecimal: true, 
            },
        },
        Stock: {
            type: DATATYPES.INTERGER,
            allowNull: false, 
            defaultValue: 10, 
            validate: {
                isNumeric: true,
            },
        },
        categoty_id: {
            type: DATATYPES.INTERGER,
            references: {
                model: 'category',
                id: 'id'
            }
        },
    },
    {
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'product',
    }
);

module.exports = Product;