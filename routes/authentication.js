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

router.get('/signin', (req, res)=>{
  res.render('auth/signin')
})
router.post('/signin',(req,res,next)=>{
  passport.authenticate('local.signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    ailureFlash: true
  })(req,res,next)
})

router.get('/profile', (req,res)=>{
  res.render('profile')
})

module.exports = router;
