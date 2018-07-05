const express = require('express')
const router = express.Router()
const model = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

router.get('/', function(req, res, next){
    if(req.session.current_user != null){
        if(req.session.current_user.isAdmin == 1){
            model.User.findAll({include : [model.Branch],
                where: { isAdmin : 0},
                order: [['id', 'ASC']]
            })
            .then(users => {
                // res.json(users)
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
    .then(editMember => {
        res.render('admin/editMember', {editMember})
    })
    .catch(err => {
        res.send(err)
    })
})

router.post('/:id/edit', function(req, res){
    model.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        }, {where: {id: req.params.id}
    })
    .then(userUpdate => {
        res.redirect('/admin')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/playing', function(req, res){
    model.User_Branch.findAll({
        include : [model.User, model.Branch],
        attributes : [
            'id', 'UserId', 'BranchId'],
            where: {isPlaying : true}
    })
    .then(usersPlaying => {
        // res.json(usersPlaying)
        res.render('admin/userPlaying', {usersPlaying})
    })
    .catch(err => {
        res.send(err)
    })  
})

router.get('/:id/delete', function(req, res){
    model.User.destroy({
        where: {id :req.params.id}
    })
    .then(()=>{
        res.redirect('/admin')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/search', function(req, res){
    model.User.findAll({
        where: {
            username : {
                [Op.like]: '%req.body.search%'}
        }
    })
    .then(users =>{
        res.render('admin/search', {users})
    })
    .catch(err => {
        res.send(err)
    })
})


module.exports = router