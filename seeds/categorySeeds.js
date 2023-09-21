const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Actor',
  },
  {
    category_name: 'Clothing',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Sports',
  },
  {
    category_name: 'Shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;