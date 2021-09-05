var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bus_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const busesScheme = new Schema({
  destination: String,
  depart: String,
  duration: Number,
  price: Number,
});

const Bus = mongoose.model("Bus", busesScheme);

/* GET home page. */
router.get("/", function (req, res, next) {
  Bus.find({}, function (err, docs) {
    if (err) return res.status(500).json({ err: { msg: "Fetch failed!" } });
    res.render("bus_list", {
      title: "Bus List",
      list: docs,
    });
  });
});
router.get("/add", function (req, res, next) {
  res.render("bus_add_form", {
    title: "add bus",
  });
});
router.post("/add", function (req, res, next) {
  const bus = new Bus({
    destination: req.body.busDestination,
    depart: req.body.busDepart,
    duration: parseInt(req.body.busDuration),
    price: parseInt(req.body.busPrice),
  });
  bus.save(function (err, busDoc) {
    if (err) return res.status(500).json({ err: { msg: "Saving failed!" } });
    res.redirect("/buses");
  });
});
module.exports = router;
