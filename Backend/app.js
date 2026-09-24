const express=require("express");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const folderRoutes = require("./routes/folderRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");

const JWT=require("jsonwebtoken")
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


app.use("/", folderRoutes);
app.use("/", authRoutes);
app.use("/", healthRoutes);

module.exports = app;