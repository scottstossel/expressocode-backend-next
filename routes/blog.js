const express = require('express');
const router = express.Router();
const {create, list, listAllBlogsCategoriesTags, read, remove, update, photo} = require('../controllers/blogControllers.js');
const {requireSignin, adminMiddleware} = require('../controllers/authControllers');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags); //improves SEO
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, update);
router.get('/blog/photo/:slug', photo);

module.exports = router;