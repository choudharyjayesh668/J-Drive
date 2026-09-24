const express=require("express");
const cors=require("cors");

const folderRoutes = require("./routes/folderRoutes");

const app=express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Health Checker
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK"
    });
});


app.use("/", folderRoutes);
const Folder = require("./models/folder");
app.put("/folder/:id",async (req,res) => {
  try{
    const {id} = req.params;
    const {folderName} = req.body;
    const foundFolder = await Folder.findOne({_id: id});
    if (!foundFolder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }
    foundFolder.folderName=folderName;
    await foundFolder.save();
    res.status(200).json({
      message: "Folder renamed successfully",
      data: foundFolder,
    });
  }catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = app;