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

module.exports = router;
