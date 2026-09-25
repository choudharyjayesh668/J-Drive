const express=require("express");
const cors=require("cors");

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

module.exports = app;