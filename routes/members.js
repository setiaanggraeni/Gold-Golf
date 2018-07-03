const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', function(req, res){
    model.User.findAll()
    .then(members => {
        res.render('members/members', {members})
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = router