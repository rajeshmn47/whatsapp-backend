const activatekey = "accountactivatekey123";
const { Op } = require("sequelize");
const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("request");
const router = express.Router();
const Status = require("../models/status");
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
  let date = new Date();
  let endDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  const statuses = await Status.findAll({
    where: {
      created_at: {
        [Op.between]: [new Date(date), new Date(endDate)],
      },
    },
  });
  console.log(statuses, "statuses");
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

router.get("/testapi", async (req, res) => {
  try {
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie:
          "ga_T5EHTJWJ5R=GS1.1.1682698096.6.1.1682698113.0.0.0; _ga=GA1.1.1931047635.1674389141; __gads=ID=31091901b84f7757-22a28ea05fd90018:T=1674389186:RT=1674389186:S=ALNI_MZ6wy5w6aZymKJIdtzrx6mnM7kF7Q; __gpi=UID=00000ba9cfb5e63e:T=1674389186:RT=1674389186:S=ALNI_MZ53Tq0OGgKfcqtoocEgaxbFPddMA; cookieconsent_dismissed=yes; PHPSESSID=tsiblvbsuf8qrbnfapsr6ucit3",
      },
      url: "https://mobile-tracker-free.com",
      body: `login=rajeshmn47%40gmail.com&pass=uni1ver%40se`,
    };
    let dom;
    let promise = new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        }
        console.log(body, response);
        resolve(body);
      });
    });
    promise.then(async (s) => {
      console.log(s, "s");
    });
    res.status(200).json({
      users: "iss",
    });
  } catch (err) {
    console.log("Error : " + err);
  }
});

module.exports = router;
