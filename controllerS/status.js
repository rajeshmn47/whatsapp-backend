const User = require("../models/user");
const Konversation = require("../models/conversations");
const express = require("express");
const jwt = require("jsonwebtoken");
const Status = require("../models/status");
const allUsers = require("../socket");
const router = express.Router();
const activatekey = "accountactivatekey123";
const { Op } = require("sequelize");

router.post("/savestatus", async (req, res) => {
  console.log(req.params, "reqparams");
  const status = await Status.create({
    posted_by: req.body.postedby,
    url: req.body.url,
  });
  console.log(status, "status");
  try {
    if (messages) {
      res.status(200).json({
        message: "success",
        statuses: status,
      });
    }
  } catch {
    res.status(200).json({
      message: "no user exists",
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
  console.log(req.params, status, "reqparams");
  let users = [];
  let seen = status.seen_by.split("+");
  for (let i = 0; i < seen.length; i++) {
    users.push(seen[i].split("user")[1]);
  }
  let found = users.find((u) => u == req.params.userid);
  console.log(found, "found");
  if (!found) {
    await status.update({
      seen_by: ``,
    });
  }
  res.status(200).json({
    data: status,
  });
});

module.exports = router;
