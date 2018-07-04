const express = require('express')
const router = express.Router()
const model = require('../models')
const passwordGenerator = require('../helper/crypto')

router.get('/', function(req, res){
    res.render('home')
})

router.get('/login', function(req, res){
    res.render('login')
})

router.post('/login', function(req, res){
    model.User.findOne({
        where: {username : req.body.username}
    })
    .then(user =>{
        if(user.isAdmin == 1){
            res.send('aksjdhasjkd')
        } else{
            res.send('yihiii')
        }
    })
})

router.get('/register', function(req, res){
    res.render('register')
})

router.post('/register', function(req, res){
    model.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: passwordGenerator(req.body.password),
        birthdate: req.body.birthdate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        BranchId: req.body.BranchId
    })
    .then(user =>{
       res.send('Thank you for submiting!')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router
