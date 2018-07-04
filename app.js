const express = require('express')
const app = express()
const routes = require('./routes')
const routesMember = require('./routes/members')
const model = require('./models')
const session = require('express-session')
const passwordGenerator = require('./helper/crypto')

app.use(express.urlencoded ({extended: false}))
app.use('/', routes)
app.use('/members', routesMember)
app.set('view engine', 'ejs')

app.use(session({
    secret: 'GG app',
    saveUninitialized: true,
    cookie: {}
  }))

app.listen(3000, function(){
    console.log('Fuck yaahhh!')
})


module.exports = routes