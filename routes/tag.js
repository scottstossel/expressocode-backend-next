const express = require('express');
const router = express.Router();
const {requireSignin, authMiddleware, adminMiddleware} = require('../controllers/authControllers');
const { create, list, read, remove } = require('../controllers/tagControllers');

//validators
const {runValidation} = require('../validators/index');
const { tagCreateValidator } = require('../validators/valtag');


router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;