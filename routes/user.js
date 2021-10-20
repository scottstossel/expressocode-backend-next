const express = require('express');
const router = express.Router();
const {requireSignin, authMiddleware, adminMiddleware} = require('../controllers/authControllers');
const { read } = require('../controllers/userController');

router.get('/profile', requireSignin, authMiddleware, read);


module.exports = router;