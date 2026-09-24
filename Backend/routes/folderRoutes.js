const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const { createFolder } = require("../controllers/folderController");
const showingAllFolder = require("../controllers/showingallfolder");
const { deleteFolder } = require("../controllers/deleteFolder");
const { openFolder } = require("../controllers/openFolder");
const {renameFolder} = require("../controllers/renameFolder");

router.post("/createFolder",verifyToken, createFolder);
router.get("/folder", verifyToken ,showingAllFolder);
router.delete("/folder/:id", verifyToken ,deleteFolder);
router.get("/folder/:id", verifyToken, openFolder);
router.put("/folder/:id", verifyToken ,renameFolder);

module.exports = router;