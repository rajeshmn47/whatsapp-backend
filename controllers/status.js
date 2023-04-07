const activatekey = "accountactivatekey123";
const { Op } = require("sequelize");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Status = require("../models/status");
const allUsers = require("../socket");
const User = require("../models/user");
const Konversation = require("../models/conversations");

router.post("/savestatus", async (req, res) => {
  const status = await Status.create({
    posted_by: req.body.postedby,
    url: req.body.url,
  });
  try {
    if (messages) {
      res.status(200).json({
        message: "success",
        statuses: status,
      });
    }
  } catch {
    res.status(200).json({
      message: "not saved",
    });
  }
});

router.get("/getstatus/:id", async function (req, res) {
  const statuses = await Status.findAll({
    where: { posted_by: `${req.params.id}` },
  });
  res.status(200).json({
    data: statuses,
  });
});

router.get("/allstatus", async function (req, res) {
  const statuses = await Status.findAll();
  res.status(200).json({
    data: statuses,
  });
});

router.get("/seenstatus/:id/:userid", async function (req, res) {
  const status = await Status.findOne({
    where: { id: `${req.params.id}` },
  });
  let users = [];
  console.log(status.seen_by, "seen");
  let seen;
  if (!(status.seen_by == null)) {
    seen = status.seen_by.split("+");
    for (let i = 0; i < seen.length; i++) {
      users.push(seen[i].split("user")[1]);
    }
  }
  let found = users.find((u) => u == req.params.userid);

  if (!found) {
    await status.update({
      seen_by: `user${req.params.userid}+${status.seen_by}`,
    });
  }
  res.status(200).json({
    data: status,
  });
});

module.exports = router;
