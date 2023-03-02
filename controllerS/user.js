const User = require("../models/user");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const activatekey = "accountactivatekey123";

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
  console.log(req.body, "req");
  const user = await User.create({
    name: req.body.myform.username,
    password: req.body.myform.password,
  });
  res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  console.log(req.body, "req");
  const user = await User.findOne({
    where: { name: req.body.myform.username },
  });
  console.log(user._previousDataValues, "outside");
  if (user) {
    if (user._previousDataValues.password == req.body.myform.password) {
      console.log(user._previousDataValues, "inside");
      var userid = user.id;
      const token = jwt.sign({ userid }, activatekey, {
        expiresIn: "50000000m",
      });
      res.status(200).json({
        message: "success",
        token: token,
        user: user,
      });
    }
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});
router.get("/loaduser", checkloggedinuser, async function (req, res) {
  console.log("loaduser", req.body.uidfromtoken);
  const user = await User.findOne({
    where: { id: req.body.uidfromtoken },
  });
  res.status(200).json({
    message: user,
  });
});

router.get("/users", async function (req, res) {
  const users = await User.findAll();
  res.status(200).json({
    message: users,
  });
});

module.exports = router;
