const express = require('express');
const router = express.Router();
const {requireSignin, authMiddleware, adminMiddleware} = require('../controllers/authControllers');
const { create, list, read, remove } = require('../controllers/categoryControllers');

//validators
const {runValidation} = require('../validators/index');
const { categoryCreateValidator } = require('../validators/valcategory');


router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;