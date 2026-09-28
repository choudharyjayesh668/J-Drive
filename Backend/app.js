const express=require("express");
const cors=require("cors");
const axios = require("axios");
//Requiring All Routes Part
const folderRoutes = require("./routes/folderRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const fileRoutes = require("./routes/fileRoutes");


const app=express();
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

//Implementing All Routes
app.use("/", folderRoutes);
app.use("/", authRoutes);
app.use("/", healthRoutes);
app.use("/", fileRoutes);
const verifyToken = require("./middleware/verifyToken");
const User = require("./models/user");
app.get("/me",verifyToken,async(req,res)=>{
  try{
    const user = await User.findById(req.userId).select("username email");
    if(!user){
      return res.status(400).json({
        success:false,
        message:"User Not Found",
      });
    };
    return res.status(200).json({
      success:true,
      name: user.username,
      email: user.email,
    });
  }catch(error){
    console.error(error);
      res.status(500).json({
        message: "Internal Server error"
    });
  }
});

module.exports = app;