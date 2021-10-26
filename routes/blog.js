const express = require('express');
const router = express.Router();
const {create} = require('../controllers/blogControllers.js');
const {requireSignin, adminMiddleware} = require('../controllers/authControllers');

router.post('/blog', requireSignin, adminMiddleware, create);

module.exports = router;