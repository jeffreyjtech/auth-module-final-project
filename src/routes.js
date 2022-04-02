'use strict';

const express = require('express');
const router = express.Router();

const { threads } = require('./models');
const bearerAuth = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/acl.js');
const threadModel = require('./models/thread-model');
const req = require('express/lib/request');

router.use(bearerAuth);

router.post('/forum', async (req, res, next) => {
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
  async (req, res, next) => {
    const threadRecords = await threads.get();
    res.status(200).json(threadRecords);
  },
);

router.put('/forum/:id', permissions('update'), async(req, res, next) =>  {
  const id = req.params.id;
  let foundThread = await threads.get(id);
  console.log(req.user.username);
  console.log(foundThread.creator);
  if(foundThread.creator !== req.user.username) {
    res.status(403).send('not authorized');
  } else {
    await threads.update(id, {...req.body, creator:req.user.username});
    let updatedThread = await threads.get(id);
    console.log(updatedThread);
    res.status(201).json(updatedThread);
  }
});

router.delete('/forum/:id', permissions('delete'), async(req, res, next) => {
  let id = req.params.id;
  let deletedRecord = await threads.delete(id);
  res.status(200).json(deletedRecord);
});



module.exports = router;