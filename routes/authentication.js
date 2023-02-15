const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/signup',(req, res, next) =>{
  res.render('auth/signup');
});

router.post('/signup',(req, res, next) =>{
  console.log(req.body)
  res.send('Posteado');
});

module.exports = router;
