// import important parts of squelize library 
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off 'Sequelize's Model Class
class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, 
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false, 
            validate: {
                isDecimal: true, 
            },
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            defaultValue: 10, 
            validate: {
                isNumeric: true,
            },
        },
        categorty_id: {
            type: DataTypes.INTEGER,
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