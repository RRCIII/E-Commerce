const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
      const allTags = await Tag.findAll({
        include: [{ model: Product }],
      });
      if (!allTags) {
        res.status(404).json({ message: "No tags were found." });
        return;
      }
      res.status(200).json(allTags);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });