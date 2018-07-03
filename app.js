const express = require('express')
const app = express()
const routes = require('./routes')
const routesMember = require('./routes/members')
const model = require('./models')

app.use(express.urlencoded ({extended: false}))
app.use('/', routes)
app.use('/members', routesMember)
app.set('view engine', 'ejs')
app.listen(3000, function(){
    console.log('Fuck yaahhh!')
})


module.exports = routes