const express = require('express')
const router = express.Router()
const model = require('../models')

router.get('/', function(req, res, next){
    if(req.session.current_user != null){
        if(req.session.current_user.isAdmin == 1){
            model.User.findAll({
                where: { isAdmin : 0}
            })
            .then(users => {
                res.render('admin/members', {users})
            })
        } else{
            res.redirect('/users')
        }
    }else{
        next()
    }
}, function(req, res){
    res.send('Please login to access the data!')
})

router.get('/:id/edit', function(req, res){
    let id = req.params.id
    model.User.findById(id)
    .then(user => {
        res.render('admin/editMember')
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
        res.redirect('/admin')
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = router
