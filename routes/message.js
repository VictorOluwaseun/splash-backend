const express = require('express');
const messageController = require('../controllers/message');
const authController = require('../controllers/auth');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(messageController.getMessage)
  .post(messageController.setUserId, messageController.createMessage);

router
  .route('/:id')
  .get(messageController.getMessage);


module.exports = router;