const express = require("express");
const jwt = require("jsonwebtoken");
const activatekey = "accountactivatekey123";
const { Op } = require("sequelize");
const router = express.Router();
const catchasyncerror = require("../catchasyncerrors");
const Massage = require("../models/messages");
const User = require("../models/user");
const Konversation = require("../models/conversations");
const sequelize = require("../sequelize");

function checkloggedinuser(req, res, next) {
  const tokenheader = req.headers["servertoken"];
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

router.get(
  "/getconversation/:id/:otherid",
  checkloggedinuser,
  catchasyncerror(async (req, res) => {
    if (req.body.uidfromtoken == req.params.otherid) {
      const user = await Konversation.findOne({
        where: {
          [Op.or]: [
            { members: `${req.params.id}+${req.params.otherid}` },
            { members: `${req.params.otherid}+${req.params.id}` },
          ],
        },
      });
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
            message: "si",
            user: u,
          });
        }
      } catch {
        res.status(200).json({
          message: "no user exists",
        });
      }
    } else {
      res.status(200).json({
        message: "no user exists",
      });
    }
  })
);

router.get("/getconversations/:id", checkloggedinuser, async (req, res) => {
  if (req.params.id == req.body.uidfromtoken) {
    const conversations = await Konversation.findAll({
      where: {
        [Op.or]: [{ memberone: req.params.id }, { membertwo: req.params.id }],
      },
    });
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
      const filtered = messages;
      conversations[i] = {
        ...conversations[i].dataValues,
        newmessage: filtered,
      };
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
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.get("/latestmessages/:id", checkloggedinuser, async (req, res) => {
  if (req.params.id == req.body.uidfromtoken) {
    const messages = await Massage.findAll({
      where: {
        [Op.or]: [
          { conversationid: req.params.id },
          { conversationid: req.params.id.split("").reverse().join("") },
        ],
      },
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
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.get("/getmessages/:id/:userid", checkloggedinuser, async (req, res) => {
  if (req.params.userid == req.body.uidfromtoken) {
    await sequelize.query("SET CHARSET utf8mb4");
    const messages = await Massage.findAll({
      where: {
        [Op.or]: [
          { conversationid: req.params.id },
          { conversationid: req.params.id.split("").reverse().join("") },
        ],
      },
    });
    messages.forEach(async (e) => {
      if (e.senderid != req.params.userid) {
        await e.update({ is_seen: true }, { where: { id: e.id } });
      }
      return e;
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
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.post("/savemessage", checkloggedinuser, async (req, res) => {
  if (req.body.senderid == req.body.uidfromtoken) {
    await sequelize.query("SET CHARSET utf8mb4");
    const messages = await Massage.create({
      conversationid: req.body.conversationid,
      message: req.body.message,
      senderid: req.body.senderid,
    });
    try {
      if (messages) {
        console.log(messages.message, "messageabcd");
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
  } else {
    res.status(200).json({
      message: "no user exists",
    });
  }
});

router.get("/onlinestatus/:id", checkloggedinuser, async (req, res) => {
  res.status(200).json({
    message: "no user exists",
  });
});

module.exports = router;
