var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bus_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;
const busesScheme = new Schema({
  destination_station: String,
  depart_station: String,
  duration_trip: Number,
  ticket_price: Number,
});

const Bus = mongoose.model("Bus", busesScheme);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
const bus = new Bus({
  destination_station: 
  depart_station: 
  duration_trip:
  ticket_price:
});

});

module.exports = router;
