const express = require('express');
const router = express.Router();

const pool = require('../database')

const { isLoggedIn } = require('../lib/auth')

/* GET users listing. */
router.get('/', isLoggedIn,async(req, res, next) => {
  const [ links ] = await pool.query('SELECT * FROM links')
  console.log(links)
  res.render('links/list',{ links })
});

router.get('/add',(req,res)=>{
  res.render('links/add')
});

router.post('/add',isLoggedIn,async (req,res)=>{
  const { title,url, description }= req.body
  const newLink = {
    title,
    url,
    description
  }

  await pool.query('INSERT INTO links SET ?', [newLink])
  req.flash('success','Link added succesfully')

  res.redirect('/links')
})

router.get('/delete/:id' ,isLoggedIn,async(req,res) =>{
  const {id} = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [id])
  req.flash('success','Link deleted succesfully')
  res.redirect('/links')
})

router.get('/edit/:id' ,isLoggedIn,async(req,res) =>{
  const {id} = req.params
  const [link] = await pool.query('SELECT * FROM links WHERE id = ?', [id])
  console.log(link)
  res.render('links/edit' ,{link:link[0]})
})

router.post('/edit/:id', isLoggedIn,async(req,res)=>{
  const {id } = req.params
  const {title, url, description} = req.body
  const newLink = {
    title,
    url,
    description
  }
  await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id])
  req.flash('success','Link saves succesfully')
  res.redirect('/links')
})

module.exports = router;
