const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// Route to GET all Users and to POST a new User
router.route("/").get(getAllUsers).post(createUser);

// GET a single user by its _id and populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);


module.exports = router;