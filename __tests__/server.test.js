'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const req = supertest(app);

describe('Basic server functionality', () => {
  // Test logic goes here
  test('Receive 404 on a bad route', async () => {
    const response = await req.get('/badroute');
    expect(response.status).toBe(404);
  });
});
