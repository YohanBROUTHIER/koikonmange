import request from 'supertest';
import app from '../src/index.js';

describe('history endpoints', () => {

  describe('route /api/history', () => {
    test('GET', async () => {

      const response = await request(app)
        .get('/api/history')
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
        .post('/api/history')
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
      expect(jsonFile).toHaveProperty('name');
      expect(jsonFile.name).toEqual("Poisson");
    
    });
    test('PATCH', async () => {

      const response = await request(app)
        .patch(`/api/history/3`)
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
        .delete(`/api/history/${5}`)
        .set('Accept', 'application/json')
        .expect(204);
    
    });
  });
});