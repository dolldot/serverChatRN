var express = require('express');
var router = express.Router();
var db = require('../config/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const SECRET_KEY = 'kalem';

function verifikasi(req, res, next){
  var header = req.headers['authorization'];
  if(typeof header === 'undefined'){
    console.log("Harus make token cuy");
  } else {
    var tokenUtuh = header.split(' ');
    var tipe = tokenUtuh[0];
    var token = tokenUtuh[1];

    if(tipe !== 'Bearer'){
      console.log("harus JWT cuy");
    }

    jwt.verify(token, SECRET_KEY, function(err, decoded){
      if(err) {
        console.log("Error : " + err);
        res.status(400).send("Token Not Valid");
      }
      
    })
    next();
  }
}

router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  db.users.findOne({
    where: {email: email}
  }).then(user => {
    if (!user) return res.status(404).send('User not found!');
    var pass = user.password;
    var datapass = bcrypt.compareSync(password, pass);
    if(!datapass) return res.status(401).send('Password salah cuy');

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.json({"User": user, "access_token": accessToken})
  })

})

/* GET users listing. */
router.get('/all', verifikasi, function(req, res, next) {
  db.users.findAll({

  }).then(users => {

    res.json(users);
  })
});

//GET USER PROFILE WITH TOKEN
router.get('/', verifikasi, function(req, res, next){
  var header = req.headers['authorization'];
  var tokenUtuh = header.split(' ');
  var token = tokenUtuh[1];
  
  jwt.verify(token, SECRET_KEY, function(err, decoded){
    db.users.findOne({
      where: {id: decoded.id}
    }).then(user => {
      res.json(user)
    })
  })
})

// GET USER PROFILE WITH ID
router.get('/:id', verifikasi, function(req, res, next){
  db.users.findOne({
    where: {id: req.params.id}
  }).then(users => {

    res.json(users);
  })
})

// UPDATE USER

router.put('/:id', verifikasi, function(req, res, next){
  var id = req.params.id;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  db.users.update({
    username: username,
    email: email,
    password: password
  }, { where: {id: id}}
  ).then(() => {
    db.users.findOne({
      where: {id: id}
    }).then(users => {
      res.json(users);
    })
  })
})

// DELETE USER AND ALL THE POSTS
router.delete('/:id', verifikasi, function(req, res, next){
  var id = req.params.id;
  db.users.findOne({
    where: {id: id}
  }).then(user => {
    if (!user) {
      return res.status(404).send();
    }
    db.posts.findAll({
      where: {userId: id},
    }).then(post => {
      if (!post) {
        return res.status(404).send();
      }
      post.destroy();
    })

    user.destroy();
  })
})

module.exports = router;
