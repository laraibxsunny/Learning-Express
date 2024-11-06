const express = require("express");
const app = express();
const Restaurant = require("../models/Restaurant");
const db = require("../db/connection");
const restaurantRouter = require("./routes/restaurants.js");

app.use(express.json());

app.use(express.urlencoded());

app.use("/restaurants", restaurantRouter);

module.exports = app;
