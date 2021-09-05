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

router.get("/", function (req, res, next) {
  Bus.find({}, function (err, docs) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: docs });
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
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Saving failed!" } });
    res.status(200).json({ success: true, busId: busDoc._id });
  });
});

router.delete("/", function (req, res, next) {
  Bus.findByIdAndDelete(req.body.busId, function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Delete failed!" } });
    res.status(200).json({ success: true });
  });
});

router.get("/:busId", function (req, res, next) {
  Bus.findById(req.params["busId"], function (err, doc) {
    if (err)
      return res
        .status(500)
        .json({ success: false, err: { msg: "Fetch failed!" } });
    res.status(200).json({ success: true, data: doc });
  });
});

router.put("/update", function (req, res, next) {
  Bus.findByIdAndUpdate(
    req.body.busId,
    {
      destination: req.body.busDestination,
      depart: req.body.busDepart,
      duration: parseInt(req.body.busDuration),
      price: parseInt(req.body.busPrice),
    },
    function (err, busDoc) {
      if (err)
        return res
          .status(500)
          .json({ success: false, err: { msg: "Saving failed!" } });
      res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
