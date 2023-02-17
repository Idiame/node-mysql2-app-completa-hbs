const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth')
const { isNotLogged } = require('../lib/auth')

/* GET home page. */
router.get('/signup',isNotLogged,(req, res, next) =>{
  res.render('auth/signup');
});

router.post('/signup', isNotLogged,passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/signin',isNotLogged, (req, res)=>{
  res.render('auth/signin')
})
router.post('/signin',isNotLogged,(req,res,next)=>{
  passport.authenticate('local.signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    ailureFlash: true
  })(req,res,next)
})

router.get('/profile', isLoggedIn, (req,res)=>{
  res.render('profile')
})

router.get('/logout', isLoggedIn,(req,res)=>{

  req.logOut(function(err){
    if(err) return next(err)
  }) /*  ESTO ES UN METODO DE PASSPORT, ENTRA EN LA BD Y ELIMINA LA SESION*/ 
  res.redirect('signin')
})

module.exports = router;
