const express = require('express')
const router = express.Router()
const model = require('../models')
const GeoPoint = require('geopoint');

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

router.get('/:id/checkDistance', function(req, res){
    model.User.findOne({
        include : [model.Branch],
            where: {id : req.session.current_user.id}
    })
    .then(user => {
        model.Branch.findAll()
        .then(branchs => {
            res.render('users/distance', {user, branchs})
        })
        .catch(err => {
            res.send(err)
        })
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/checkDistance', function(req, res){
    model.User.findOne({
        where: {id : req.session.current_user.id}
    })
    .then(user => {
        // res.json(user)
        model.Branch.findOne({
            where: {id : req.body.nextBranch}
        })
        .then(branch => {
            // res.json(branch)
            var point1 = new GeoPoint(Number(user.latitude), Number(user.longitude));
            // console.log("yang satu nihh -----------------",point1)
            var point2 = new GeoPoint(Number(branch.latitude), Number(branch.longtitude));
            // console.log("xxxxxxxxxxxxxxxyg uda nihhh",point2)
            var distance = point1.distanceTo(point2, true)
            var km = Math.round(distance)
            res.render('users/getDistance', {km})
            // res.json(km)
        })
        .catch(err => {
            res.send(err)
        })
    })
    .catch(err => {
        res.send(err)
    })
})



module.exports = router