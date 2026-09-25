const express=require("express");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const folderRoutes = require("./routes/folderRoutes");
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const fileRoutes = require("./routes/fileRoutes");
const JWT=require("jsonwebtoken")
const app=express();
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyToken");
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
app.use("/", fileRoutes);
// const multer = require("multer");
// const upload = multer({dest: "uploads/",});
// const File = require("./models/files");
// const fs = require("fs");
// const { Bot } = require("node-telegram-bot-api");
// const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);
// const FormDataPackage = require("form-data");
// const axios = require("axios");
// app.post("/uploadFile/:folderId",verifyToken,upload.array("files"),async(req,res)=>{
//   const { folderId } = req.params;
//   try {
//       for (const file of req.files) {
//         const fileBuffer = fs.readFileSync(file.path);
//         const formData = new FormDataPackage();
//         formData.append("document", fileBuffer, {
//           filename: file.originalname,
//           contentType: file.mimetype,
//         });
//         formData.append(
//           "chat_id",
//           process.env.TELEGRAM_CHANNEL_ID
//         );
//         const response = await axios.post(
//           `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
//           formData,
//           {
//             headers: formData.getHeaders(),
//           }
//         );
//         const telegramFileId =
//           response.data.result.document?.file_id;
//         const newFile = new File({
//           fileName: file.originalname,
//           telegramFileId: telegramFileId,
//           messageId: String(response.data.result.message_id),
//           mimeType: file.mimetype,
//           owner: req.userId,
//           folder: folderId,
//         });
//         await newFile.save();
//         console.log(`${file.originalname} → Telegram → MongoDB`);
//       }
//       res.status(201).json({
//         message: "All files uploaded successfully",
//       });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({
//         message: "Upload failed",
//       });
//     }
// });

module.exports = app;
// const newFile = new File({
//         fileName: filedata.originalname,
//         telegramFileId: filedata.originalname,
//         messageId: filedata.path,
//         mimeType: filedata.mimetype,
//         owner: req.userId,
//         folder: folderId,
//       });
//       await newFile.save();