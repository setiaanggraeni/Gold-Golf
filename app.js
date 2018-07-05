const express = require('express')
const app = express()
const routes = require('./routes')
const routesAdmin = require('./routes/admin')
const routesUser = require('./routes/users')
const session = require('express-session')

app.use(express.urlencoded ({extended: false}))
app.locals.prefix = require('./helper/prefix')
// HARUS taruh session sebelum app.use
app.use(session({
    secret: 'GG app',
    saveUninitialized: true,
    cookie: {}
  }))

app.use('/', routes)
app.use('/admin', routesAdmin)
app.use('/users', routesUser)
app.set('view engine', 'ejs')
app.listen(3000, function(){
    console.log('go go go!')
})


module.exports = routes
