import request from 'supertest';
import app from '../src/index.js';

describe('history endpoints', () => {
  describe('route /api/history', () => {
    test('GET', async () => {
      const response = await request(app)
        .get(`/api/history/`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
      
      const jsonFile = response.body;

      expect(Array.isArray(jsonFile)).toBeTruthy();
      jsonFile.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item.id).toBeGreaterThan(0);
        expect(item).toHaveProperty('userId');
        expect(item['userId']).toBeGreaterThan(0);
        expect(item).toHaveProperty('recipes');
        expect(Array.isArray(item.recipes)).toBeTruthy();
        item.recipes.forEach((recipe => {
          expect(recipe).toHaveProperty("id");
          expect(recipe.id).toBeGreaterThan(0);
          expect(recipe).toHaveProperty("name");
          expect(typeof recipe.name).toBe("string");
          expect(recipe).toHaveProperty("image");
          expect(typeof recipe.image === "string" || recipe.image === null).toBeTruthy();
          expect(Array.isArray(recipe.steps)).toBeTruthy();
          recipe.steps.forEach(step => {
            expect(typeof step).toBe("string");
          });
          expect(recipe).toHaveProperty("hunger");
          expect(typeof recipe.hunger).toBe("string");
          expect(recipe.hunger === "little" || recipe.hunger === "normal" || recipe.hunger === "big").toBeTruthy();
          expect(recipe).toHaveProperty("time");
          expect(recipe).toHaveProperty("preparationTime");
          expect(recipe).toHaveProperty("cookingTime");
          expect(recipe).toHaveProperty("userId");
          expect(recipe["userId"] > 0 || recipe["userId"] === null).toBeTruthy();
        }));
      });
    });
    test('POST', async () => {
      const historyData = {
        "userId": 1
      };

      const response = await request(app)
        .post('/api/history')
        .send(historyData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);

      const jsonFile = response.body;

      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty('userId');
      expect(jsonFile['userId']).toEqual(1);
    });
  });

  describe('route /api/history/:id', () => {
    test('GET', async () => {

      const response = await request(app)
        .get(`/api/history/2`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    
      const jsonFile = response.body;
    
      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toEqual(2);
      expect(jsonFile).toHaveProperty('userId');
      expect(jsonFile['userId']).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty('recipes');
      expect(Array.isArray(jsonFile.recipes)).toBeTruthy();
      jsonFile.recipes.forEach((recipe => {
        expect(recipe).toHaveProperty("id");
        expect(recipe.id).toBeGreaterThan(0);
        expect(recipe).toHaveProperty("name");
        expect(typeof recipe.name).toBe("string");
        expect(recipe).toHaveProperty("image");
        expect(typeof recipe.image === "string" || recipe.image === null).toBeTruthy();
        expect(Array.isArray(recipe.steps)).toBeTruthy();
        recipe.steps.forEach(step => {
          expect(typeof step).toBe("string");
        });
        expect(recipe).toHaveProperty("hunger");
        expect(typeof recipe.hunger).toBe("string");
        expect(recipe.hunger === "little" || recipe.hunger === "normal" || recipe.hunger === "big").toBeTruthy();
        expect(recipe).toHaveProperty("time");
        expect(recipe).toHaveProperty("preparationTime");
        expect(recipe).toHaveProperty("cookingTime");
        expect(recipe).toHaveProperty("userId");
        expect(recipe["userId"] > 0 || recipe["userId"] === null).toBeTruthy();
      }));
    
    });
    test('DELETE', async () => {
      await request(app)
        .delete(`/api/history/4`)
        .set('Accept', 'application/json')
        .expect(204);
    });
  });

  describe('/history/:historyId/recipe/:RecipeId', () => {
    test('PUT', async () => {
      await request(app)
        .put(`/api/history/3/recipe/8`)
        .set('Accept', 'application/json')
        .expect(200);    
    });
    test('PATCH', async () => {
      await request(app)
        .patch(`/api/history/3/recipe/8`)
        .send({validate:true})
        .set('Accept', 'application/json')
        .expect(200);   
    });
    test('DELETE', async () => {
      await request(app)
        .delete(`/api/history/3/recipe/8`)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
});