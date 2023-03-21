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
    where: {
      [Op.or]: [
        { members: `${req.params.id}+${req.params.otherid}` },
        { members: `${req.params.otherid}+${req.params.id}` },
      ],
    },
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
        memberone: `${req.params.id}`,
        membertwo: `${req.params.otherid}`,
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
  const conversations = await Konversation.findAll({
    where: {
      [Op.or]: [{ memberone: req.params.id }, { membertwo: req.params.id }],
    },
  });
  console.log(conversations, "conversation");
  for (let i = 0; i < conversations.length; i++) {
    const messages = await Massage.findAll({
      where: {
        [Op.or]: [
          { conversationid: conversations[i].members },
          {
            conversationid: conversations[i].members
              .split("")
              .reverse()
              .join(""),
          },
        ],
      },
    });
    const filtered = messages.filter((m) => m.is_seen == false);
    conversations[i] = { ...conversations[i].dataValues, newmessage: filtered };
  }
  try {
    if (conversations) {
      res.status(200).json({
        message: "success",
        user: conversations,
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

router.get("/getmessages/:id/:userid", async (req, res) => {
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
    if ((e.senderid = !req.params.userid)) {
      await e.update({ is_seen: true }, { where: { id: e.id } });
    }
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
