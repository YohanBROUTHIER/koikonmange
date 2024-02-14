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
        expect(item.hunger === "little" || item.hunger === "normal" || item.hunger === "big").toBeTruthy();
        expect(item).toHaveProperty("time");
        expect(item).toHaveProperty("preparationTime");
        expect(item).toHaveProperty("cookingTime");
        expect(item).toHaveProperty("userId");
        expect(item["userId"] > 0 || item["userId"] === null).toBeTruthy();
      });

    });
    test("POST", async () => {
      const recipeData = {
        name: "Champion",
        steps: ["étapes 1", "étapes 2", "étapes 3", "étapes 4"],
        hunger: "little",
        time: "40 minutes",
        preparationTime: "20 minutes"
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
      expect(jsonFile).toHaveProperty("preparationTime");
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
      expect(jsonFile.name).toEqual("Tartiflette");
      expect(jsonFile).toHaveProperty("image");
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();
      expect(Array.isArray(jsonFile.steps)).toBeTruthy();
      expect(String(jsonFile.steps)).toEqual(String([
        "Eplucher les pommes de terre, les couper en dés, bien les rincer et les essuyer dans un torchon propre.",
        "Faire chauffer l huile dans une poêle, y faire fondre les oignons.",
        "Lorsque les oignons sont fondus, ajouter les pommes de terre et les faire dorer de tous les côtés.",
        "Lorsqu elles sont dorées, ajouter les lardons et finir de cuire. Éponger le surplus de gras avec une feuille de papier essuie-tout.",
        "D autre part, gratter la croûte du reblochon et le couper en deux (ou en quatre).",
        "Préchauffer le four à 200°C (thermostat 6-7) et préparer un plat à gratin en frottant le fond et les bords avec la gousse d ail épluchée.",
        "Dans le plat à gratin, étaler une couche de pommes de terre aux lardons, disposer dessus la moitié du reblochon, puis de nouveau des pommes de terre. Terminer avec le reste du reblochon (croûte vers les pommes de terre).",
        "Enfourner pour environ 20 minutes de cuisson."
      ]));

      expect(jsonFile).toHaveProperty("hunger");
      expect(jsonFile.hunger).toEqual("normal");
      expect(jsonFile).toHaveProperty("time");
      expect(jsonFile).toHaveProperty("preparationTime");
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