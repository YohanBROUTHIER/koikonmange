import request from "supertest";
import app from "../src/index.js";

describe("UserController endpoints", () => {
  describe("POST /api/signup", () => {
    test("should create a new user", async () => {
      // Define a sample user data for testing
      const userData = {
        name: "TestUser",
        email: "testuser@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      // Send a POST request to the signup endpoint
      await request(app)
        .post("/api/signup")
        .send(userData)
        .set("Accept", "application/json")
        .expect(201);
    });

    // Add more tests for different scenarios related to signup endpoint if needed
  });

  describe("POST /api/signin", () => {
    test("should authenticate and return a token", async () => {
      // Define a sample user data for testing
      const userData = {
        email: "testuser@example.com",
        password: "password123",
      };

      // Send a POST request to the signin endpoint
      const response = await request(app)
        .post("/api/signin")
        .send(userData)
        .set("Accept", "application/json")
        .expect(200);

      const jsonFile = response.body;
      
      expect(jsonFile).toHaveProperty("accessToken");
      expect(typeof jsonFile.accessToken).toBe("string");
      
      const accessTokenRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(accessTokenRegex.test(jsonFile.accessToken)).toBe(true);

      expect(jsonFile).toHaveProperty("accessTokenExpiresAt"); 
      const accessTokenExpiresAtRegex = /^\d{2}:\d{2}:\d{2}$/;
      expect(accessTokenExpiresAtRegex.test(jsonFile.accessTokenExpiresAt)).toBe(true);
      
      expect(jsonFile).toHaveProperty("refreshToken");
      const refreshTokenRegex = /^[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}$/;
      expect(refreshTokenRegex.test(jsonFile.refreshToken)).toBe(true);

      expect(jsonFile).toHaveProperty("refreshTokenExpiresAt"); 
      const refreshTokenExpiresAtRegex = /^\d{2}:\d{2}:\d{2}$/;
      expect(refreshTokenExpiresAtRegex.test(jsonFile.refreshTokenExpiresAt)).toBe(true);
      
      expect(jsonFile).toHaveProperty("user"); 
      expect(typeof jsonFile.user).toBe("object");
      
      expect(jsonFile.user).toHaveProperty("id");
      expect(jsonFile.user.id).toBeGreaterThan(0);
      expect(jsonFile.user).toHaveProperty("name");
      expect(jsonFile.user.name).toBe("string");
      expect(jsonFile.user).toHaveProperty("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(jsonFile.user.email)).toBe(true);
    });
  });
});