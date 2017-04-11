`use strict`

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const KnexSessionStore = require('connect-session-knex')(session)
const {knex} = require('./db/database')

const routes = require('./routes/')

app.set('view engine', 'pug')

app.locals.company = `💑 JPJ Dating`
app.locals.body = {}
app.locals.errors = {}


/**************Middlewares************/
app.use(cookieParser('secretdating'))
app.use(session({cookie: {maxAge: 60000}, secret: 'secretdating', resave: true, saveUninitialized: false}))
app.use(flash())
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions'
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || 'jpjdatingsupersecretkey'
}))

require('./lib/passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  // sets app.locals.username to true or false
  app.locals.username = req.user && req.user.username
  next()
})

app.use(express.static('public'))

app.use(routes)
// app.use((req,res)=>{
//   res.render('/login', {page: Login})
// })

// app.use((req, res) => {
//   res.render('/')
// })


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
