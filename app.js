const express = require('express')
const app = express.Router()
const routes = require('./routes')
const faker = require('faker')

app.use(express.urlencoded ({extended: false}))

app.set('view engine', ejs)
app.use('/', routes)
app.listen(3000, function(){
    console.log('Fuck yaahhh!')
})

module.exports = router