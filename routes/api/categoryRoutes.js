const router = require("express").router();
const { Category, Product } = require("../../Models");

// The '/api/categories' endpoint
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    if (!allCategories) {
      res.status(404).json({ message: "No categories were found" });
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its 'id' value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findOne({
      include: [{ model: Product }],
      where: { id: req.params.id },
    });

    if (!categoryById) {
      res.status(404).json({ message: "No category with the id was found." });
      return;
    }
    res.status(200).json(categoryById);
  } catch (error) {
    console.log(error);
    res.status(500).jason(err);
  }
});

router.post("/", async (req, res) => {
  // create new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  }catch (err){
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its 'id' value
  try {
    const upDateCategory =  await Category.update(
      { category_name: req.body.categroy_name},
      {
        where: { id: req.params.id },
      }
    );
    if(!upDateCategory[0]) {
      res.status(404).json({ message: "No categroy with this id found."})
      return;
    }
    res.status(200).json(upDateCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteCategory = await Category.delete({
      where: req.params.id
    }); 
    if (!deleteCategory){
      res.status(404).json({ message:"No catergory with the id."});
      return;
    }
  } catch (error) {
    console.log(err);
    res.status(500).json(err);   
  }

});