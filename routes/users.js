const express = require('express')
const router = express.Router()
const model = require('../models')
const passwordGenerator = require('../helper/crypto')

router.get('/', function(req, res){
   model.User.findOne({
       where: {id : req.session.current_user.id}
   })
   .then(user => {
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

module.exports = router