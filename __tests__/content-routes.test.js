'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const request = supertest(app);
let token = '';
let threadId = null;
let replyId = null;

describe('Test thread routes', () => {
  // Test logic goes here
  test('Create a thread', async () => {
    let response = await request.post('/signup').send({ username: 'editor', password: 'editor', role:'editor' });

    token = response.body.user.token;

    response = await request.post('/forum')
      .send({creator: 'editor', title: 'Why does new music suck?'})
      .set('authorization', `Bearer ${token}`);
    
    threadId = response.body.id;

    expect(response.status).toBe(201);
  });
  test('Get all threads', async() => {
    let response = await request.get('/forum').set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
  });

  test('update specific thread by id', async() => {
    let response = await request.put(`/forum/${threadId}`).send({creator: 'editor', title: 'New music is the best!!!1!1'}).set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New music is the best!!!1!1');
  });

  test('whether or not we can delete threads', async () => {
    let response = await request.delete(`/forum/${threadId}`).set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});

describe('Test reply routes', () => {

  test('Create a reply', async () => {
    let response = await request.post('/forum')
      .send({creator: 'editor', title: 'Why does new music suck?'})
      .set('authorization', `Bearer ${token}`);

    threadId = response.body.id;

    response = await request.post(`/forum/${threadId}`)
      .send({creator: 'editor', bodyText: 'I agree, new music does suck'})
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(201);
    expect(response.body.bodyText).toBe('I agree, new music does suck');
  });

  test('Get all replies', async () => {

    let response = await request.post(`/forum/${threadId}`)
      .send({creator: 'editor', bodyText: 'New music is the worst'})
      .set('authorization', `Bearer ${token}`);

    response = await request.get(`/forum/${threadId}`)
      .set('authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body[0].bodyText).toBe('I agree, new music does suck');
    expect(response.body[1].bodyText).toBe('New music is the worst');
  
    replyId = response.body[0].id;
  });

  test('Update a reply', async () => { 

    let response = await request.put(`/forum/${threadId}/${replyId}`)
      .send({creator: 'editor', bodyText: 'I changed my mind, I disagree and I like new music'})
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.bodyText).toBe('I changed my mind, I disagree and I like new music');
  });

  test('Delete a reply', async () => {

    let response = await request.delete(`/forum/${threadId}/${replyId}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    response = await request.get(`/forum/${threadId}`)
      .set('authorization', `Bearer ${token}`);

    expect(response.body.find(reply => reply.bodyText === 'I agree, new music does suck')).toBeFalsy();
    expect(response.body.find(reply => reply.bodyText === 'New music is the worst')).toBeTruthy();
  });
});