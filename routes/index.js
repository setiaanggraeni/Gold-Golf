const express = require('express')
const router = express.Router()
const model = require('../models')
const sendEmail = require('../routes/nodeMailer')
const bcrypt = require('bcrypt')

router.get('/', function(req, res){
    res.render('home')
})

router.get('/login', function(req, res, next){
    req.session.current_user = null
    res.render('login')
})

router.post('/login', function(req, res){
    model.User.findOne({
        where: {username : req.body.username}
    })
    .then(user =>{
        if(user){
            var check = bcrypt.compareSync(req.body.password, user.password)
            if(check){
                req.session.current_user = user
                res.redirect('/admin')
            } else if(req.body.password === user.password){
                req.session.current_user = user
                res.redirect('/admin')
            }
            else{
                res.send('Wrong password!')
            }
        } else{
            res.send('User not found!')
        }
    })
})

router.get('/logout', function(req, res){
    req.session.current_user = null
    res.redirect('/login')
})

router.get('/register', function(req, res){
    model.Branch.findAll()
    .then(branches => {
        res.render('register', {branches})
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/register', function(req, res){
    model.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        birthdate: req.body.birthdate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        BranchId: req.body.BranchId,
        gender: req.body.gender
    })
    .then(user =>{
        sendEmail(req.body.email)
       res.send('Thank you for submiting!')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router
