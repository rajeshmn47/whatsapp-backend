const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const activatekey = "accountactivatekey123";
const User = require("../models/user");

function checkloggedinuser(req, res, next) {
  const tokenheader = req.body.headers || req.headers["servertoken"];

  if (tokenheader) {
    jwt.verify(tokenheader, activatekey, function (err, decoded) {
      if (!err) {
        req.body.uidfromtoken = decoded.userid;
      }
      next();
    });
  } else {
    res.status(200).json({
      success: false,
    });
  }
}

router.post("/register", async (req, res) => {
  const user = await User.create({
    name: req.body.myform.username,
    password: req.body.myform.password,
  });
  res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    where: { name: req.body.myform.username },
  });
  if (user) {
    if (user._previousDataValues.password == req.body.myform.password) {
      var userid = user.id;
      const token = jwt.sign({ userid }, activatekey, {
        expiresIn: "50000000m",
      });
      res.status(200).json({
        message: "success",
        token: token,
        user: user,
      });
    } else {
      console.log("no user");
      res.status(400).json({
        message: "no user exists",
      });
    }
  } else {
    console.log("no user");
    res.status(400).json({
      message: "no user exists",
    });
  }
});
router.get("/loaduser", checkloggedinuser, async function (req, res) {
  const user = await User.scope("withoutPassword").findOne({
    where: { id: req.body.uidfromtoken },
  });
  res.status(200).json({
    message: user,
  });
});

router.get("/users", async function (req, res) {
  const users = await User.scope("withoutPassword").findAll();
  res.status(200).json({
    message: users,
  });
});

router.get("/getuser/:id", async function (req, res) {
  const user = await User.scope("withoutPassword").findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    data: user,
  });
});

router.post("/editname", async (req, res) => {
  const user = await User.findOne({
    where: { id: `${req.body.id}` },
  });
  await user.update({ name: req.body.name });
  res.status(200).json(user);
});

router.post("/editabout", async (req, res) => {
  const user = await User.findOne({
    where: { id: `${req.body.id}` },
  });
  await user.update({ about: req.body.about });
  res.status(200).json(user);
});

router.post("/editphoto", async (req, res) => {
  const user = await User.findOne({
    where: { id: `${req.body.id}` },
  });
  await user.update({ profilephoto: req.body.profilephoto });
  res.status(200).json(user);
});

module.exports = router;
