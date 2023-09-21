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

  router.get("/:id", async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
      const tagById = await Tag.findOne({
        include: [{ model: Product }],
        where: { id: req.params.id },
      });
      if (!tagById) {
        res.status(404).json({ message: "No tag with this id found." });
        return;
      }
      res.status(200).json(tagById);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.post("/", async (req, res) => {
    // create a new tag
    try {
      const newTag = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(newTag);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });
  
  router.put("/:id", async (req, res) => {
    // update a tag's name by its `id` value
    try {
      const updateTag = await Tag.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updateTag[0]) {
        res.status(404).json({ message: "No tag with the id." });
        return;
      }
      res.status(200).json(updateTag);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete("/:id", async (req, res) => {
    // delete on tag by its `id` value
    try {
      const deleteTag = await Tag.destroy({
        where: { id: req.params.id },
      });
      if (!deleteTag) {
        res.status(404).json({ message: "No tag with the id." });
        return;
      }
      res.status(200).json(deleteTag);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;