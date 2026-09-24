const express = require("express");
const router = express.Router();

const { createFolder } = require("../controllers/folderController");
const showingAllFolder = require("../controllers/showingallfolder");
const { deleteFolder } = require("../controllers/deleteFolder");
const { openFolder } = require("../controllers/openFolder");
const {renameFolder} = require("../controllers/renameFolder");

router.post("/createFolder", createFolder);
router.get("/folder", showingAllFolder);
router.delete("/folder/:id", deleteFolder);
router.get("/folder/:id",openFolder);
router.put("/folder/:id",renameFolder);

module.exports = router;