import request from 'supertest';
import app from '../src/index.js';

describe('history endpoints', () => {

  describe('route /api/history', () => {
    test('POST', async () => {
      const historyData = {
        "user_id": 1
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
      expect(jsonFile).toHaveProperty('user_id');
      expect(jsonFile['user_id']).toEqual(1);
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
      expect(jsonFile).toHaveProperty('user_id');
      expect(jsonFile['user_id']).toBeGreaterThan(0);
    
    });
    test('PATCH', async () => {

      const response = await request(app)
        .patch(`/api/history/3`)
        .send({
          "user_id": 2
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    
      const jsonFile = response.body;
        
      expect(jsonFile).toHaveProperty('id');
      expect(jsonFile.id).toEqual(3);
      expect(jsonFile).toHaveProperty('user_id');
      expect(jsonFile['user_id']).toEqual(2);
    
    });
    test('DELETE', async () => {

      await request(app)
        .delete(`/api/history/4`)
        .set('Accept', 'application/json')
        .expect(204);
    
    });
  });
});