'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const request = supertest(app);

describe('Test thread routes', () => {
  // Test logic goes here
  test('Create a thread', async () => {
    let response = await request.post('/signup').send({ username: 'editor', password: 'editor', role:'editor' });

    let token = response.body.user.token;

    response = await request.post('/forum')
      .send({creator: 'username', title: 'Why does new music suck?'})
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(201);
  });
});
