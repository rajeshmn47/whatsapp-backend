const User = require("../models/user");
const Konversation = require("../models/conversations");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const activatekey = "accountactivatekey123";

router.get("/getconversation/:id/:otherid", async (req, res) => {
  console.log(req.params, "req");
  const user = await Konversation.findOne({
    members: `${req.params.id}+${req.params.otherid}`,
  });
  console.log(user, "conversation");
  if (user) {
    res.status(200).json({
      message: "success",

      user: user,
    });
  } else {
    const u = await Konversation.create({
      members: `${req.params.id}+${req.params.otherid}`,
    });
    res.status(200).json({
      message: "success",
  
      user: u,
    });
  }

  res.status(200).json({
    message: "no user exists",
  });
});

module.exports = router;
