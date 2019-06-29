var express = require('express');
var router = express.Router();
var db = require('../config/db');
var jwt = require('jsonwebtoken');

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

// GET ALL POST
router.get('/', verifikasi, function(req, res){
    db.chats.findAll({
        include: [
            {model: db.users}
        ]
    })
    .then(chats => {
        res.json(chats);
    })
})

// GET POST FOR SPECIFIC USER
router.get('/user/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.chats.findOne({
        include: [
            {model: db.users}
        ],
        where: {userId: id}
    }).then(chats => {
        // res.send(JSON.stringify({"Status": 200, "error": null, "results": posts}))chats
        res.json(chats)
    })
})

// GET SPECIFIC POST
router.get('/:id', verifikasi, function(req, res, next){
    var id = req.params.id;
  
    db.chats.findOne({
        include: [
            {model: db.users}
        ],
        where: {id: id}
    }).then(chat => {
        res.json(chat)
    })
})

// CREATE A POST
router.post('/', verifikasi, function(req, res, next){
    var userId = req.body.userId;
    var text = req.body.text;

    db.chats.create({
        userId: userId,
        text: text
    }).then(() => {
        db.chats.findAll({
            include: [
                {model: db.users}
            ]
        }).then(chats => {
            res.json(chats)
        })
    })
})

// RANDOM CHAT
router.post('/random', function(req, res, next){
    var userId = req.body.userId;
    var text = req.body.text;

    db.chats.create({
        userId: userId,
        text: text
    }).then(() => {
        db.chats.findAll({
            include: [
                {model: db.users}
            ]
        }).then(chats => {
            res.json(chats)
        })
    })
})

// UPDATE POST
router.put('/:id', verifikasi, function(req, res, next){
  var id = req.params.id;
  var userId = req.body.userid;
  var text = req.body.text;

    db.chats.update({
        userId: userId,
        text: text
    }, {where: {id: id}}
    ).then(() => {
        db.chats.findOne({
            include: [
                {model: db.users}
            ],
            where: {id: id}
        }).then(chat => {
            res.json(chat)
        })
    })
})

// DELETE POST
router.delete('/:id', verifikasi, function(req, res, next){
    var id = req.params.id;

    db.chats.findOne({
        where: {id: id},
    }).then(chat => {
        if (!chat) {
            return res.status(404).send();
        }
        chat.destroy();
        res.status(200).send();
    })
})

module.exports = router;
