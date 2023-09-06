// import models
const Product = require('./Product');
const Category = require('../Models/Category');
const Tag = require('../Tag');
const ProductTag = require('./ProductTag');

// Product belongsTo Category
Product.belongsTo(Category, {foreignKey: 'category_id'});

// Categories hasMany Products 
Category.hasMany(Product, {foreignKey: 'category_id'});

// Products belongToMany Tags via productTag
Product.belongsToMany(Tag, {
    foreignKey: 'product_id',
    through: ProductTag,
});
// Tag belongToMany Product via ProductTag 
Tag.belongsToMany(Product, {
    foreignKey: 'tag_id',
    through: ProductTag,
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag, 
};
