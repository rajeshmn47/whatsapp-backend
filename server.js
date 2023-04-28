const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const UserA = require("./models/user");
const Konversation = require("./models/conversations");
const Massage = require("./models/messages");
const Lead = require("./models/list");
const auth = require("./controllers/user");
const message = require("./controllers/messaging");
const status = require("./controllers/status");
const video = require("./controllers/video");
const sequelize = require("./sequelize");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", auth);
app.use("/conversation", message);
app.use("/status", status);
app.use("/video", video);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
app.get("/", async (req, res) => {
  const users = await User.findAll();

  res.send(users);
});

app.get("/pushcategories", async (req, res) => {
  res.send("API running");
});
app.get("/createproduct", async (req, res) => {
  res.send("API running");
});
app.get("/findout", async (req, res) => {
  const users = await UserA.findAll();
  res.send(users);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/client/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
const PORT = process.env.PORT || 9000;
app.listen(9000, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
