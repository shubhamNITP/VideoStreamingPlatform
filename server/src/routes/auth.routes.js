const express = require("express");

const {
  register,
  login,
  getMe,
} = require("../controllers/auth.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", protect, getMe);

router.post("/register", register);

router.post("/login", login);

module.exports = router;