const User = require("../models/user");
const Conversation = require("../models/conversation");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const activatekey = "accountactivatekey123";

router.get("/getconversation/:id/:otherid", async (req, res) => {
  console.log(req.params, "req");
  const user = await Conversation.findOne({
    where: {
      members: [req.params.id, req.params.otherid], // Same as using `id: { [Op.in]: [1,2,3] }`
    },
  });
  console.log(user, "conversation");
  if (user) {
    res.status(200).json({
      message: "success",
      token: token,
      user: user,
    });
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

module.exports = router;
