const passport = require("passport")
const {Strategy} = require('passport-local')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req,username,password,done)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    if(rows.length > 0){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)
        if (validPassword){
            done(null, user, req.flash('success', 'Welcome ' + username))
        }else{
            done(null, false, req.flash('message', 'Incorrect Password'))
        }
    } else{
        return done(null, false, req.flash('message', ('User does not exists')))
    }
}))

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done)=>{
    const { email, fullname } = req.body
    const newUser = {
        username, 
        password,
        email,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password)

    const [result] = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId    
    // console.log(result)
    return done(null, newUser)
}))

passport.serializeUser((user,done) =>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null,rows[0])
})