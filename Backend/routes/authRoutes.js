const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
    signup,
    login,
    logout,
    verify,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken, verify);

module.exports = router;