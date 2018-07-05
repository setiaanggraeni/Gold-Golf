const express = require('express')
const router = express.Router()
const model = require('../models')
const passwordGenerator = require('../helper/crypto')

router.get('/', function(req, res) {
  model.User.findOne({
      where: {
        id: req.session.current_user.id
      }
    })
    .then(user => {
      res.render('users/user', {
        user
      })
    })
    .catch(err => {
      res.send(err)
    })
})
router.get('/:id/play', function(req, res) {
  model.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(user => {
      model.Branch.findAll()
        .then(branchs => {
          // res.json(branchs)
          res.render('users/play', {
            user,
            branchs
          })
        })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/:id/play', function(req, res) {
  model.User_Branch.create({
      UserId: req.body.id,
      BranchId: req.body.BranchId
    })
    .then(user => {
      res.send('Enjoy your golfing!')
    })
    .catch(err => {
      res.send(err)
    })
})

router.get("/:id/edit", function(req, res) {
  model.User
    .findById(req.params.id)
    .then(function(user) {
      return user
    })
    .then(function(user) {
      model.User
        .findById()
        .then(function(users) {
          res.render("users/editUser", {
            user: user
          })
        })
        .catch(function(err) {
          res.json(err)
        })
    })
    .catch(function(err) {
      res.json(err)
    })
})

router.post("/:id/edit", function(req, res) {
  model.User
    .findById(req.params.id)
    .then(function(user) {
      if (user.email === req.body.email) {
        delete req.body.email
      }

      model.User
        .update({
          password: passwordGenerator(req.body.password),
          birthdate: req.body.birthdate,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
        }, {
          where: {
            id: req.params.id
          }
        })
        .then(function(user) {
          res.redirect("/user")
        })
        .catch(function(error) {
          model.User
            .findById(req.params.id)
            .then(function(user) {
              return user
            })
            .then(function(user) {
              model.User
                .findAll()
                .then(function() {
                  res.render("users/", {
                    user: user
                  })
                })
                .catch(function(err) {
                  res.json(err)
                })
            })
            .catch(function(err) {
              res.json(err)
            })
        })
    })
    .catch(function(err) {
      res.send(err)
    })
})


module.exports = router
