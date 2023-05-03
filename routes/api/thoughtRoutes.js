const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
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

// PUT to add a reaction to a thought by its _id
router.route("/:id/reactions").put(addReaction);

// DELETE to remove a reaction to a thought by its _id and its reactionId
router.route("/:id/reactions/:reactionId");

module.exports = router;