import request from 'supertest';
import app from '../src/index.js';

describe('ingredient endpoints', () => {

  describe('route /api/ingredient', () => {
    test('GET', async () => {

      const response = await request(app)
        .get('/api/ingredient')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);

      const jsonFile = response.body;

      expect(Array.isArray(jsonFile)).toBeTruthy();
      jsonFile.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item.id).toBeGreaterThan(0);
        expect(item).toHaveProperty('name');
        expect(typeof item.name).toBe('string');
        expect(item).toHaveProperty('image');
        expect(typeof item.image === "string" || item.image === null).toBeTruthy();
        expect(item).toHaveProperty('families');
        expect(Array.isArray(item.families)).toBeTruthy();
        item.families.forEach(family => {
          expect(family).toHaveProperty('id');
          expect(family.id).toBeGreaterThan(0);
          expect(family).toHaveProperty('name');
          expect(typeof family.name).toBe('string');
        });
      });

    });
    test('POST', async () => {
      const ingredientData = {
        "name": "abracadabra"
      };

      const response = await request(app)
        .post('/api/ingredient')
        .send(ingredientData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);

      const jsonFile = response.body;

      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty('name');
      expect(typeof jsonFile.name).toBe('string');
      expect(jsonFile).toHaveProperty('image');
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();
    });
  });

  describe('route /api/ingredient/:id', () => {
    test('GET', async () => {

      const response = await request(app)
        .get(`/api/ingredient/2`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    
      const jsonFile = response.body;
    
      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty('name');
      expect(typeof jsonFile.name).toBe('string');
      expect(jsonFile).toHaveProperty('image');
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();
      expect(jsonFile).toHaveProperty('families');
      expect(Array.isArray(jsonFile.families)).toBeTruthy();
      jsonFile.families.forEach(family => {
        expect(family).toHaveProperty('id');
        expect(family.id).toBeGreaterThan(0);
        expect(family).toHaveProperty('name');
        expect(typeof family.name).toBe('string');
      });
    
    });
    test('PATCH', async () => {

      const response = await request(app)
        .patch(`/api/ingredient/3`)
        .send({
          "name": "abracadabroaaaaa"
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    
      const jsonFile = response.body;
        
      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toEqual(3);
      expect(jsonFile).toHaveProperty('name');
      expect(jsonFile.name).toEqual("abracadabroaaaaa");
      expect(jsonFile).toHaveProperty('image');
      expect(typeof jsonFile.image === "string" || jsonFile.image === null).toBeTruthy();    
    });
    test('DELETE', async () => {

      await request(app)
        .delete(`/api/ingredient/${5}`)
        .set('Accept', 'application/json')
        .expect(204);
    
    });
  });
  describe('/recipe/:recipeId/ingredient/:ingredientId', () => {
    test('PUT', async () => {
      await request(app)
        .put(`/api/recipe/3/ingredient/8`)
        .send({quantity: 200, unitId:2})
        .set('Accept', 'application/json')
        .expect(200);    
    });
    test('PATCH', async () => {
      await request(app)
        .patch(`/api/recipe/3/ingredient/8`)
        .send({quantity: 300})
        .set('Accept', 'application/json')
        .expect(200);   
    });
    test('DELETE', async () => {
      await request(app)
        .delete(`/api/recipe/3/ingredient/8`)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
});