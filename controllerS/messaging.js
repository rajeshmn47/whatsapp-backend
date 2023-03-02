const User = require("../models/user");
const Konversation = require("../models/conversations");
const express = require("express");
const jwt = require("jsonwebtoken");
const Massage = require("../models/messages");
const router = express.Router();
const activatekey = "accountactivatekey123";

router.get("/getconversation/:id/:otherid", async (req, res) => {
  console.log(req.params, "reqparams");
  const user = await Konversation.findOne({
    where: { members: `${req.params.id}+${req.params.otherid}` },
  });
  console.log(user, "conversation");
  try {
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
  } catch {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.get("/getmessages/:id", async (req, res) => {
  console.log(req.params, "reqparams");
  const messages = await Massage.findAll({
    $or: [
      {
        conversationid: {
          $eq: req.params.id,
        },
      },
      {
        conversationid: {
          $eq: req.params.id.split("").reverse().join(""),
        },
      },
    ],
  });
  console.log(messages, "conversation");
  try {
    if (messages) {
      res.status(200).json({
        message: "success",
        messages: messages,
      });
    }
  } catch {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.post("/savemessage", async (req, res) => {
  console.log(req.params, "reqparams");
  const messages = await Massage.create({
    conversationid: req.body.conversationid,
    message: req.body.message,
    senderid: req.body.senderid,
  });
  console.log(messages, "conversation");
  try {
    if (messages) {
      res.status(200).json({
        message: "success",
        messages: messages,
      });
    }
  } catch {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

module.exports = router;
