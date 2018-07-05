const express = require('express')
const router = express.Router()
const model = require('../models')
var GeoPoint = require('geopoint');

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
        UserId : req.body.UserId,
        BranchId: req.body.BranchId,
        isPlaying: true
    })
    .then(user => {
        // res.render(user)
        res.render('users/playing')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/finish', function(req, res){
    model.User_Branch.update({
        isPlaying: false,
        isFinished: true
    }, {where: {UserId : req.params.id}})
    .then(user => {
        // res.render(user)
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/:id/edit', function(req, res){
    let id = req.params.id
    model.User.findById(id)
    .then(editMember => {
        res.render('users/editUser', {editMember})
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
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        }, {where: {id: req.params.id}
    })
    .then(userUpdate => {
        res.redirect('/users')
    })
    .catch(err => {
        res.send(err)
    })
})

// router.get('/checkDistance', function(req, res){
//     model.User.findOne({
//         where: {id : req.session.current_user.id}
//     })
//     .then(user => {
//         // user.fullName = user.getFullName()
//         res.render('users/user', {user})
//     })
//     .catch(err => {
//         res.send(err)
//     })
//  })
// point1 = new GeoPoint(lat1, long1);
// point2 = new GeoPoint(lat2, long2);
// var distance = point1.distanceTo(point2, true)

module.exports = router
