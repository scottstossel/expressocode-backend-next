const express = require('express');
const router = express.Router();
const {signup, signin, signout, requireSignin} = require('../controllers/authControllers');


//validators
const {runValidation} = require('../validators/index')
const {userSignupValidator, userSigninValidator} = require('../validators/valauth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

//test
// router.get('/secret', requireSignin, (req, res) => {
//   res.json({
//     user: req.auth
//   })
// })

module.exports = router;