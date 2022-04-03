'use strict';

const supertest = require('supertest');
const { app } = require('../src/server.js');
const request = supertest(app);

let multiReplyThread = null;

let permsUser1 = { username: 'permsUser1', password: 'permsUser1', role:'editor' };
let permsUser2 = { username: 'permsUser2', password: 'permsUser2', role:'editor' };
let permsAdmin = { username: 'permsAdmin', password: 'permsAdmin', role:'admin' };

let testUsers = [permsUser1, permsUser2, permsAdmin];

beforeAll(async () => {
  
  for (let user of testUsers) {
    let response = await request.post('/signup').send(user);

    user.token = response.body.user.token;
  
    // Each user creates their own thread.
    response = await request.post('/forum')
      .send({creator: user.username, title: `${user.username} is the coolest person` })
      .set('authorization', `Bearer ${user.token}`);

    user.threadId = response.body.id;
  }

  // Create new thread for multiple users to POST to.
  let multiReplyResponse = await request.post('/forum')
    .send({creator: permsUser1.username, title: `Fight me` })
    .set('authorization', `Bearer ${permsUser1.token}`);

  multiReplyThread = multiReplyResponse.body.id;
  
  for (let user of testUsers) {
    // Each user adds a reply to the multiReplyThread
    let response = await request.post(`/forum/${multiReplyThread}`)
      .send({creator: 'editor', bodyText: `${user.username} will fight you`})
      .set('authorization', `Bearer ${user.token}`);

    user.replyId = response.body.id;
  }
});


describe('Checking admin overrides and delete/update protections for threads', () => {

  test('Normal user can NOT update another user\'s thread', async () => {

    let response = await request.put(`/forum/${permsUser1.threadId}`)
      .send({title: `NOOOOO! ${permsUser2.username} is the coolest person` })
      .set('authorization', `Bearer ${permsUser2.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toBe('not authorized');
  });

  test('Normal user can NOT delete another user\'s thread', async () => {

    let response = await request.delete(`/forum/${permsUser1.threadId}`)
      .set('authorization', `Bearer ${permsUser2.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toBe('not authorized');
  });

  test('Admin can delete another user\'s thread', async () => {

    let response = await request.delete(`/forum/${permsUser1.threadId}`)
      .set('authorization', `Bearer ${permsAdmin.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(permsUser1.threadId);
  });
});

describe('Checking admin overrides and delete/update protections for replies', () => {

  test('Normal user can NOT update another user\'s reply', async () => {

    let response = await request.put(`/forum/${multiReplyThread}/${permsUser1.replyId}`)
      .send({bodyText: `Sorry that was uncalled for.` })
      .set('authorization', `Bearer ${permsUser2.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toBe('not authorized');
  });

  test('Normal user can NOT delete another user\'s reply', async () => {

    let response = await request.delete(`/forum/${multiReplyThread}/${permsUser1.replyId}`)
      .set('authorization', `Bearer ${permsUser2.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toBe('not authorized');
  });

  test('Admin can delete another user\'s reply', async () => {

    let response = await request.delete(`/forum/${multiReplyThread}/${permsUser1.replyId}`)
      .set('authorization', `Bearer ${permsAdmin.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(permsUser1.replyId);
  });
});