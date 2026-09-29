const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const telegramConfig = require("../middleware/telegramConfig");

const { createFolder } = require("../controllers/folderController");
const {showingAllFolder} = require("../controllers/folderController");
const { deleteFolder } = require("../controllers/folderController");
const { openFolder } = require("../controllers/folderController");
const {renameFolder} = require("../controllers/folderController");

router.post("/createFolder",verifyToken, createFolder);
router.get("/folder", verifyToken ,showingAllFolder);
router.delete("/folder/:id", verifyToken , telegramConfig ,deleteFolder);
router.get("/folder/:id", verifyToken, openFolder);
router.put("/folder/:id", verifyToken ,renameFolder);

module.exports = router;