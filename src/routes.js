'use strict';

const express = require('express');
const router = express.Router();

const { threads, replies } = require('./models');
const bearerAuth = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/acl.js');

router.post('/forum', bearerAuth, async (req, res, next) => {
  try {
    let newThread = await threads.create({...req.body, creator:req.user.username});
    res.status(201).json(newThread);
  } catch (e) {
    console.error(e);
    next(e.message);
  }
});

router.get(
  '/forum',
  bearerAuth,
  async (req, res, next) => {
    const threadRecords = await threads.get();
    res.status(200).json(threadRecords);
  },
);

router.put('/forum/:id', bearerAuth, permissions('update'), async(req, res, next) =>  {
  const id = req.params.id;
  let foundThread = await threads.get(id);
  console.log(req.user.username);
  console.log(foundThread.creator);
  if(foundThread.creator === req.user.username) {
    await threads.update(id, {...req.body, creator:req.user.username});
    let updatedThread = await threads.get(id);
    console.log(updatedThread);
    res.status(201).json(updatedThread);
  } else {
    res.status(403).json('not authorized');
  }
});

router.delete('/forum/:id', bearerAuth, permissions('delete'), async(req, res, next) => {
  let id = req.params.id;

  let foundThread = await threads.get(id);
  if(foundThread.creator === req.user.username || req.user.role === 'admin') {
    await threads.delete(id);
    res.status(200).json(foundThread);
  } else {
    res.status(403).json('not authorized');
  }
});

// POST reply route
router.post('/forum/:threadId/', bearerAuth, async (req, res, next) => {
  let threadId = parseInt(req.params.threadId);
  try {
    let newReply = await replies.create({...req.body, creator:req.user.username, threadId});
    res.status(201).json(newReply);
  } catch (e) {
    console.error(e);
    next(e.message);
  }
});

router.get('/forum/:threadId/', bearerAuth, async (req, res, next) => {
  let threadId = parseInt(req.params.threadId);
  try {
    let foundReplies = await replies.getByForeignKey({threadId});
    // let foundReplies = await replies.get();
    res.status(200).json(foundReplies);
  } catch (e) {
    console.error(e);
    next(e.message);
  }
});

router.put('/forum/:threadId/:replyId', bearerAuth, permissions('update'), async(req, res, next) =>  {
  const threadId = req.params.threadId;
  const replyId = req.params.replyId;
  console.log(threadId);
  let foundThread = await threads.get(threadId);
  if (!foundThread) {
    let err404 = new Error('Thread does not exist');
    err404.status = 404;
    next(err404);
  } else {
    let foundReply = await replies.get(replyId);
    if(foundReply.creator === req.user.username) {
      await replies.update(replyId, {...req.body, creator:req.user.username});
      let updatedReply = await replies.get(replyId);
      console.log(updatedReply);
      res.status(201).json(updatedReply);
    } else {
      res.status(403).json('not authorized');
    }
  }
});

router.delete('/forum/:threadId/:replyId', bearerAuth, permissions('delete'), async(req, res, next) => {
  const threadId = req.params.threadId;
  const replyId = req.params.replyId;

  let foundThread = await threads.get(threadId);
  if (!foundThread) {
    let err404 = new Error('Thread does not exist');
    err404.status = 404;
    next(err404);
  } else {
    let foundReply = await replies.get(replyId);
    if(foundReply.creator === req.user.username || req.user.role === 'admin') {
      await threads.delete(replyId);
      res.status(200).json(foundReply);
    } else {
      res.status(403).json('not authorized');
    }
  }
});

module.exports = router;