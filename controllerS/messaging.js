const User = require("../models/user");
const Konversation = require("../models/conversations");
const express = require("express");
const jwt = require("jsonwebtoken");
const Massage = require("../models/messages");
const allUsers = require("../socket");
const router = express.Router();
const activatekey = "accountactivatekey123";
const { Op } = require("sequelize");

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

router.get("/getconversations/:id", async (req, res) => {
  console.log(req.params, "reqparams");
  const user = await Konversation.findAll({
    where: { members: `${req.params.id}` },
  });
  console.log(user, "conversation");
  try {
    if (user) {
      res.status(200).json({
        message: "success",
        user: user,
      });
    }
  } catch {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.get("/latestmessages/:id", async (req, res) => {
  console.log(req.params, "reqparam");
  const messages = await Massage.findAll({
    where: {
      [Op.or]: [
        { conversationid: req.params.id },
        { conversationid: req.params.id.split("").reverse().join("") },
      ],
    },
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

router.get("/getmessages/:id", async (req, res) => {
  console.log(req.params, "reqparam");
  const messages = await Massage.findAll({
    where: {
      [Op.or]: [
        { conversationid: req.params.id },
        { conversationid: req.params.id.split("").reverse().join("") },
      ],
    },
  });
  console.log(messages, "conversation");
  messages.forEach(async (e) => {
    await e.update({ is_seen: true }, { where: { id: e.id } });
  });
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

router.get("/onlinestatus/:id", async (req, res) => {
  console.log(req.params, "reqparams");
  console.log("allUsers", "99");
  res.status(200).json({
    message: "no user exists",
  });
});

module.exports = router;
