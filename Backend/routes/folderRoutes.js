const express = require("express");
const router = express.Router();

const { createFolder } = require("../controllers/folderController");
const showingAllFolder = require("../controllers/showingallfolder");

router.post("/createFolder", createFolder);
router.get("/folder", showingAllFolder);

module.exports = router;