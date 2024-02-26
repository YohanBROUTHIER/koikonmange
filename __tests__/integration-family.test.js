import request from 'supertest';
import app from '../src/index.js';

describe('family endpoints', () => {
  describe('route /api/family', () => {
    test('GET', async () => {

      const response = await request(app)
        .get('/api/family')
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
      });

    });
    test('POST', async () => {
      const listData = {
        "name": "abracadabra"
      };

      const response = await request(app)
        .post('/api/family')
        .send(listData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);

      const jsonFile = response.body;

      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toBeGreaterThan(0);
      expect(jsonFile).toHaveProperty('name');
      expect(jsonFile.name).toEqual(listData.name);
    });
  });

  describe('route /api/family/:id', () => {
    test('GET', async () => {

      const response = await request(app)
        .get(`/api/family/2`)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    
      const jsonFile = response.body;
    
      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toEqual(2);
      expect(jsonFile).toHaveProperty('name');
      expect(typeof jsonFile.name).toBe('string');    
    });
    test('PATCH', async () => {

      const response = await request(app)
        .patch(`/api/family/3`)
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
        .delete(`/api/family/${5}`)
        .set('Accept', 'application/json')
        .expect(204);
    
    });
  });

  describe('route /ingredient/:ingredientId/family/:familyId', () => {
    test('PUT', async () => {
      await request(app)
        .put(`/api/ingredient/3/family/1`)
        .set('Accept', 'application/json')
        .expect(200);   
    });
    test('DELETE', async () => {
      await request(app)
        .delete(`/api/ingredient/3/family/1`)
        .set('Accept', 'application/json')
        .expect(200);
    });
  });
});