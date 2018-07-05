const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', function(req, res){
   model.User.findOne({
       where: {id : req.session.current_user.id}
   })
   .then(user => {
       user.fullName = user.getFullName()

       res.render('users/user', {user})
   })
   .catch(err => {
       res.send(err)
   })
})
router.get('/:id/play', function(req, res){
    model.User.findOne({
        where: { id: req.params.id}
    })
    .then(user => {
        model.Branch.findAll()
        .then(branchs => {
            // res.json(branchs)
            res.render('users/play', {user, branchs})
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/play', function(req, res){
    model.User_Branch.create({
        UserId : req.body.id,
        BranchId: req.body.BranchId
    })
    .then(user => {
        res.send('Enjoy your golfing!')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/edit', function(req, res){
    let id = req.params.id
    model.User.findById(id)
    .then(user => {
        res.render('users/editUser')
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/edit', function(req, res){
    model.User.update({
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
        }, {where: {id: req.params.id}
    })
    .then(userUpdate => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
})

module.exports = router
