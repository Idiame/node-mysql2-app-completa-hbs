const express = require('express');
const router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/signup',(req, res, next) =>{
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/profile', (req,res)=>{
  res.send('THIS IS YOUR PROFILE')
})

module.exports = router;
