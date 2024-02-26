import request from "supertest";
import app from "../src/index.js";

describe("recipe endpoints", () => {

  describe("route /api/recipe", () => {
    test("GET", async () => {
      const response = await request(app)
        .get("/api/recipe")
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);

      const jsonFile = response.body;

      expect(Array.isArray(jsonFile)).toBeTruthy();
      jsonFile.forEach(item => {
        expect(item).toHaveProperty("id");
        expect(item.id).toBeGreaterThan(0);
        expect(item).toHaveProperty("name");
        expect(typeof item.name).toBe("string");
        expect(item).toHaveProperty("image");
        expect(typeof item.image === "string" || item.image === null).toBeTruthy();
        expect(Array.isArray(item.steps)).toBeTruthy();
        item.steps.forEach(step => {
          expect(typeof step).toBe("string");
        });
        expect(item).toHaveProperty("hunger");
        expect(typeof item.hunger).toBe("string");
        expect(item.hunger === "Léger" || item.hunger === "Normal" || item.hunger === "Copieux").toBeTruthy();
        expect(item).toHaveProperty("time");
        expect(item).toHaveProperty("preparatingTime");
        expect(item).toHaveProperty("cookingTime");
        expect(item).toHaveProperty("person");
        expect(item.person).toBeGreaterThan(0);
        expect(item).toHaveProperty("userId");
        expect(item["userId"] > 0 || item["userId"] === null).toBeTruthy();
      });

    });
    test("POST", async () => {
      const recipeData = {
        name: "Champion",
        steps: ["étapes 1", "étapes 2", "étapes 3", "étapes 4"],
        hunger: "Léger",
        time: "00:40:00",
        preparatingTime: "00:20:00",
        person:3
      };

      const response = await request(app)
        .post("/api/recipe")
        .send(recipeData)
        .set("Accept", "application/json")
        .expect(201)
        .expect("Content-Type", /json/);

      const jsonFile = response.body;

      expect(jsonFile).toHaveProperty("id");
      expect(jsonFile.id).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty("name");
      expect(jsonFile.name).toEqual(recipeData.name);
      expect(jsonFile).toHaveProperty("image");
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();
      expect(Array.isArray(jsonFile.steps)).toBeTruthy();
      expect(String(jsonFile.steps)).toEqual(String(recipeData.steps));

      expect(jsonFile).toHaveProperty("hunger");
      expect(jsonFile.hunger).toEqual(recipeData.hunger);
      expect(jsonFile).toHaveProperty("time");
      expect(jsonFile).toHaveProperty("preparatingTime");
      expect(jsonFile).toHaveProperty("person");
      expect(jsonFile.person).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty("userId");
      expect(jsonFile["userId"] > 0 || jsonFile["userId"] === null).toBeTruthy();
    });
  });

  describe("route /api/recipe/:id", () => {
    test("GET", async () => {

      const response = await request(app)
        .get(`/api/recipe/1`)
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);
    
      const jsonFile = response.body;
    
      expect(jsonFile).toHaveProperty("id");
      expect(jsonFile.id).toEqual(1);
      expect(jsonFile).toHaveProperty("name");
      expect(typeof jsonFile.name).toBe("string");
      expect(jsonFile).toHaveProperty("image");
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();
      expect(Array.isArray(jsonFile.steps)).toBeTruthy();
      jsonFile.steps.forEach(step => {
        expect(typeof step).toBe("string");
      });
      expect(jsonFile).toHaveProperty("hunger");
      expect(typeof jsonFile.hunger).toBe("string");
      expect(jsonFile.hunger === "Léger" || jsonFile.hunger === "Normal" || jsonFile.hunger === "Copieux").toBeTruthy();
      expect(jsonFile).toHaveProperty("time");
      expect(jsonFile).toHaveProperty("preparatingTime");
      expect(jsonFile).toHaveProperty("cookingTime");
      expect(jsonFile).toHaveProperty("person");
      expect(jsonFile.person).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty("userId");
      expect(jsonFile["userId"] > 0 || jsonFile["userId"] === null).toBeTruthy();
    
    });
    test("PATCH", async () => {

      const response = await request(app)
        .patch(`/api/recipe/3`)
        .send({
          "name": "abracadabroaaaaa"
        })
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);
    
      const jsonFile = response.body;
        
      expect(jsonFile).toHaveProperty("id");
      expect(jsonFile.id).toEqual(3);
      expect(jsonFile).toHaveProperty("name");
      expect(jsonFile.name).toEqual("abracadabroaaaaa");
    
    });
    test("DELETE", async () => {
      await request(app)
        .delete(`/api/recipe/5`)
        .set("Accept", "application/json")
        .expect(204);
    
    });
  });
});