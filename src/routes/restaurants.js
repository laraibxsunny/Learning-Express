const express = require("express");
const restaurantRouter = express.Router();
const Restaurant = require("../../models/Restaurant");
const { check, validationResult } = require("express-validator");


restaurantRouter.get("/", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

restaurantRouter.get("/:id", async (req, res) => {
  const restaurantByID = await Restaurant.findByPk(req.params.id);
  res.json(restaurantByID);
});

restaurantRouter.post("/", 
  [check("name").not().isEmpty().trim()],
    [check("location").not().isEmpty().trim()],
      [check("cuisine").not().isEmpty().trim()],
        async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            res.status(400);
            res.json({error: errors.array()});
          } else {
            await Restaurant.create(req.body);
            const allRestaurants = await Restaurant.findAll();
            res.json(allRestaurants);
          }
});

restaurantRouter.put("/:id", async (req, res) => {
  let updateRestaurant = await Restaurant.findByPk(req.params.id);
  await updateRestaurant.update(req.body);
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

restaurantRouter.delete("/:id", async (req, res) => {
  let deleteRestaurant = await Restaurant.findByPk(req.params.id);
  await deleteRestaurant.destroy();
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

module.exports = restaurantRouter;
