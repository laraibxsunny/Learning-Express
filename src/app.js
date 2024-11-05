const express = require("express");
const app = express();
const Restaurant = require("../models/Restaurant");
const db = require("../db/connection");

app.use(express.json());

app.use(express.urlencoded());

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurantByID = await Restaurant.findByPk(req.params.id);
  res.json(restaurantByID);
});

app.post("/restaurants", async (req, res) => {
  await Restaurant.create(req.body);
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.put("/restaurants/:id", async (req, res) => {
  let updateRestaurant = await Restaurant.findByPk(req.params.id);
  await updateRestaurant.update(req.body);
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.delete("/restaurants/:id", async (req, res) => {
  let deleteRestaurant = await Restaurant.findByPk(req.params.id);
  await deleteRestaurant.destroy();
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = app;
