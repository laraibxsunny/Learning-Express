const request = require("supertest");
const app = require("../src/app.js");
const syncSeed = require("../seed.js");
const Restaurant = require("../models/Restaurant.js");
let restaurantQuantity;

beforeAll(async () => {
  await syncSeed();
  const restaurants = await Restaurant.findAll();
  restaurantQuantity = restaurants.length;
});

describe("Testing /restaurants Route", () => {
  test("GET /restaurants returns Status Code 200", async () => {
    //Arrange /Act
    const response = await request(app).get("/restaurants");
    //Assert
    expect(response.statusCode).toBe(200);
  });

  test("GET /restaurants returns an Array of Restaurants", async () => {
    //Arrange /Act
    const response = await request(app).get("/restaurants");
    //Assert
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].name).toBe("AppleBees");
  });

  test("GET /restaurants returns the Correct Data", async () => {
    //Arrange /Act
    const response = await request(app).get("/restaurants");
    //Assert
    expect(response.body).toContainEqual(
      expect.objectContaining({
        name: "LittleSheep",
        location: "Dallas",
        cuisine: "Hotpot",
      })
    );
  });

  test("POST /restaurants returns a larger Array", async () => {
    //Arrange /Act
    const response = await request(app).post("/restaurants").send({
      name: "Sunny's Kitchen",
      location: "Bristol",
      cuisine: "Indian",
    });
    //Assert
    expect(response.body.length).toBe(restaurantQuantity + 1);
  });

  test("PUT /restaurants updates items by ID", async () => {
    //Arrange
    await request(app).put("/restaurants/1").send({
      name: "Five Guys",
      location: "Bristol",
      cuisine: "American",
    });
    //Act
    const restaurant = await Restaurant.findByPk(1);
    //Assert
    expect(restaurant.name).toBe("Five Guys");
    expect(restaurant.location).toBe("Bristol");
  });

  test("DELETE /restaurants deletes items by ID", async () => {
    //Arrange
    await request(app).delete("/restaurants/1");
    //Act
    const restaurant = await Restaurant.findAll();
    //Assert
    expect(restaurant[0].id).not.toBe(1);
  });
});
