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
app.get("/folder/:id", async (req,res)=>{
  try{
    const {id} = req.params;
    console.log(id);
    res.status(200).json({
      message: "Folder Opened successfully",
    });
  }catch(error){
    res.status(500).json({
      message: `Failed To Open Folder ${err.message}`,
    });
  };
});

module.exports = app;