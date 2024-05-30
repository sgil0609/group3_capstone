const request = require("supertest");
const app = require("./cart");

describe("GET /users/:userId/orders/pending", () => {
  it("should return pending orders for a user", async () => {
    const userId = 2; // Replace with an actual user ID
    const response = await request(app).get(`/users/${userId}/orders/pending`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should handle errors when retrieving pending orders", async () => {
    const userId = 1; // Replace with an actual user ID
    const response = await request(app).get(`/users/${userId}/orders/pending`);
    expect(response.status).toBe(500);
    expect(response.text).toContain("Failed to retrieve pending orders");
  });
});

describe("POST /add-to-cart", () => {
  it("should create a new order", async () => {
    const orderData = {
      userId: 123,
      productId: 789,
      total: 50,
    };
    const response = await request(app).post("/add-to-cart").send(orderData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id"); 
  });

  it("should handle errors when creating an order", async () => {
    const invalidOrderData = {
      // Provide invalid order data here
    };
    const response = await request(app)
      .post("/add-to-cart")
      .send(invalidOrderData);
    expect(response.status).toBe(500);
    expect(response.text).toContain("Failed to add to cart");
  });
});


