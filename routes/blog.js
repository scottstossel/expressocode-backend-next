const express = require('express');
const router = express.Router();
const {time} = require('../controllers/blogControllers.js');

router.get('/', time);

module.exports = router;