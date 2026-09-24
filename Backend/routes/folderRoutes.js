const express = require("express");
const router = express.Router();

const { createFolder } = require("../controllers/folderController");
const showingAllFolder = require("../controllers/showingallfolder");
const { deleteFolder } = require("../controllers/deleteFolder");


router.post("/createFolder", createFolder);
router.get("/folder", showingAllFolder);
router.delete("/folder/:id", deleteFolder);

module.exports = router;