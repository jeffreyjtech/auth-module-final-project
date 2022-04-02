'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const request = supertest(app);
let token = '';

describe('Test thread routes', () => {
  // Test logic goes here
  test('Create a thread', async () => {
    let response = await request.post('/signup').send({ username: 'editor', password: 'editor', role:'editor' });

    token = response.body.user.token;

    response = await request.post('/forum')
      .send({creator: 'username', title: 'Why does new music suck?'})
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(201);
  });
  test('Get all threads', async() => {
    let response = await request.get('/forum').set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    console.log(response.body);
  });

  test('update specific thread by id', async() => {
    let response = await request.put(`/forum/${1}`).send({creator: 'username', title: 'New music is the best!!!1!1'}).set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body.title).toBe('New music is the best!!!1!1');
  });

  test('whether or not we can delete threads', async () => {
    let response = await request.delete(`/forum/${1}`).set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
