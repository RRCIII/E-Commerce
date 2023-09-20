const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

//  get all products
router.get("/", async (req, res) => {
  //find  all produts
  // be sure to include its associted Category and Tag data
  try {
    const allProducts = await Product.FindAll({
      attributes: ["id", "product_name", "price", "stock"],
      include: [
        { model: Category, atrributes: ["category_name"] },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: {
            model: ProductTag,
            attributes: ["product_id", "tag_id"],
          },
        },
      ],
    });
    if (!allProducts) {
      res.status(404).json({ message: "No products were found" });
      return;
    }
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productById = await Product.findOnce({
      attributes: ["id", "product_name", "price", "stock"],
      incdue: [
        { model: Category, attributes: ["category_name"] },
        {
          model: Tag,
          attributes: ["id", "tag_name"],
          through: {
            model: ProductTag,
            attributes: ["product_id", "tag_id"],
          },
        },
      ],
      where: { id: req.params.id },
    });
    if (!productById) {
      res.status(404).json({ message: "No product with this id found" });
      return;
    }
    res.status(200).json(productById);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      console.log(product);
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
    // delete one product by its `id` value
    try {
      const deleteProduct = await Product.destroy({
        where: { id: req.params.id },
      });
      if (!deleteProduct) {
        res.status(404).json({ message: "No product with the id." });
        return;
      }
      res.status(200).json(deleteProduct);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;