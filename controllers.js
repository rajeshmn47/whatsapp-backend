const Order = require("./models/list");
const express = require("express");
const router = express.Router();

router.post("/list", async (req, res) => {
  const newOrder = await Order.create({
    name: req.body.name,
    country: req.body.country,
    dateofbirth: req.body.dateofbirth,
    resume: req.body.resume,
  });
  res.status(200).json(newOrder);
});

router.get("/list", async (req, res) => {
  const list = await Order.findAll();
  res.status(200).json(list);
});

router.get("/countries/:query", async (req, res) => {
  const list = countries.filter(
    (c) => c.name.toLowerCase().indexOf(req.params.query.toLowerCase()) > -1
  );
  res.status(200).json(list);
});
router.get("/list/delete/:id", async (req, res) => {
  const list = await Order.findOne({ id: req.params.id });
  await list.destroy();
  res.status(200).json("deleted successfully");
});
router.post("/list/edit/:id", async (req, res) => {
  const list = await Order.findOne({ id: req.params.id });
  await list.update({
    name: req.body.name,
    dateofbirth: req.body.dateofbirth,
    resume: req.body.resume,
    country: req.body.country,
  });
  res.status(200).json("deleted successfully");
});
/* exports */
module.exports = router;
