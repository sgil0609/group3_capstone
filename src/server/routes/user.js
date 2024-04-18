const express = require("express");
const router = express.Router();
const {
  verifyToken,
} = require("group3_capstone/src/server/middleware/auth.js");

// Protected route: Requires valid JWT token
router.get("/profile", verifyToken, (req, res) => {
  // Access user data from req.user
  const userId = req.user.id;
  //TODO Fetch user profile data from the database (using Prisma or any other ORM)
  // Respond with user profile details
  res.json({ userId, message: "Profile data retrieved successfully" });
});


router.get("/users", (req, res) => {
  // get all users
});

router.get("/users/:id", (req, res) => {
  // get a user by id
});

router.post("/users", (req, res) => {
  // create a new user
});

router.put("/users/:id", (req, res) => {
  // update a user by id
});

router.delete("/users/:id", (req, res) => {
  // delete a user by id
});

module.exports = router;
