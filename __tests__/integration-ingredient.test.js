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
      expect(jsonFile.id).toEqual(2);
      expect(jsonFile).toHaveProperty('name');
      expect(jsonFile.name).toEqual('Poire');
      expect(jsonFile).toHaveProperty('image');
    
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
    
    });
    test('DELETE', async () => {

      await request(app)
        .delete(`/api/ingredient/${5}`)
        .set('Accept', 'application/json')
        .expect(204);
    
    });
  });
});