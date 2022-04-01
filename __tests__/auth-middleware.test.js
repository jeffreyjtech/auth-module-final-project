'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const request = supertest(app);

const base64 = require('base-64');

describe('Auth testing', () => {
  const username = 'test user';
  const password = 'great passowrd';

  test('Able to sign up', async () => {
    const response = await request.post('/signup').send({username, password});
    expect(response.status).toBe(201);
    expect(response.body.username).toBe(username);
  });

  test('Response is 403 on bad login', async () => {
    const response = await request.post('/signin').set('authorization', 'bad auth string');

    expect(response.status).toBe(403);
  });

  test('Able to log in', async () => {
    let authString = base64.encode(`${username}:${password}`);

    const response = await request.post('/signin').set('authorization', `Basic ${authString}`);

    expect(response.status).toBe(200);
  });
});

















