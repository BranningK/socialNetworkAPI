const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  // createReaction,
  // deleteReaction,
} = require("../../controllers/thoughtController");

// GET all thoughts
// POST to create a new thought
router.route("/").get(getAllThoughts).post(createThought);

// GET a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);


module.exports = router;