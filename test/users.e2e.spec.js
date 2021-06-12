const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");

require("dotenv").config();

const app = require("../app");
const db = require("../model/db");
const User = require("../model/user");
const Users = require("../repositories/users");

const { newTestUser } = require("./data/data");

// jest.mock("cloudinary");

describe("Test route users", () => {
  let token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newTestUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newTestUser.email });
    await mongo.disconnect();
  });

  it("Register User", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
  });
  it("Create 409 User", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(409);
    expect(response.body).toBeDefined();
  });
  it("Login User", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    token = response.body.data.token;
  });
  it("Wrong Login User", async () => {
    const response = await request(app)
      .post("/api/users/60ad371ee5c5131384447a75")
      .send(newTestUser)
      .set("Accept", "application/json");
    expect(response.status).toEqual(404);
    expect(response.body).toBeDefined();
  });
  it("Upload Avatar User", async () => {
    const buf = await fs.readFile("./test/data/avatt.jpg");
    const response = await request(app)
      .patch("/api/users/avatars")
      .set("Authorization", `Bearer ${token}`)
      .attach("avatar", buf, "avatt.jpg");
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});
