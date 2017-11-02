//Підключаємо бібліотеки
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

var dotenv = require('dotenv').config({
    silent: process.env.NODE_ENV === 'production',
    path: __dirname + '/.env'
});

const knex = require('./db/knex.js');
const port = process.env.PORT || 8000;

//Клієнтська частина сайту знаходитиметься у папці public
app.use(express.static(__dirname + '/public'));
//Стандарти кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

//Авторизація
//app.post('/login', function (req, res) {
//    knex.select().from('users').where('login', req.body.login)
//        .then(function (users) {
//            if (users[0] != undefined) {
//                if (users[0].password == req.body.pass) {
//                    knex('users').where('login', req.body.login).update({
//                        status: true
//                    }).then(function () {
//                        res.send('welcome');
//                    })
//                } else {
//                    res.send('Wrong password')
//                }
//            } else {
//                res.send('Wrong login')
//            }
//        })
//
//});

////Зареєструвати нового користувача
//app.post('/users', function (req, res) {
//    knex('users').insert({
//        login: req.body.login,
//        password: req.body.pass,
//        mail: req.body.mail,
//        status: false
//    }).then(function () {
//        res.sendStatus(200);
//    })
//});
//
//
////Розлогінитись
//app.post('/logout', function (req, res) {
//    knex('users').where('login', req.body.login).update({
//        status: false
//    }).then(function () {
//        res.sendStatus(200);
//    })
//});
//
////Видалити користувача
//app.post('/user-remove', function (req, res) {
//    knex('users').where('login', req.body.login).del()
//        .then(function () {
//            res.sendStatus(200);
//        })
//});

////Отримати класи
//app.get('/classes', function (req, res) {
//    knex.select().from('classes')
//        .then(function (classes) {
//            res.status(200).send(classes)
//        })
//});
////Отримати учнів
//app.get('/pupils', function (req, res) {
//    knex.select().from('pupils')
//        .then(function (pupils) {
//            res.status(200).send(pupils)
//        })
//});


//Отримати вчителів
//app.get('/test01', function (req, res) {
//    knex.raw('DROP DATABASE IF EXISTS testtoday')
//        .then(function () {
//            console.log('good!');
//            res.sendStatus(200);
//        })
//});





//Отримати вчителів
app.get('/teachers', function (req, res) {
    knex.select().from('teachers')
        .then(function (teachers) {
            res.status(200).send(teachers)
        })
});

//Додати вчителя
app.post('/add-teach', function (req, res) {
    knex('teachers').insert({
        name: req.body.name,
        sname: req.body.sname
    }).then(function () {
        res.sendStatus(200);
    })
});

//Редагувати вчителя
app.post('/edit-teach', function (req, res) {
    knex('teachers').where('id', req.body.id).update({
        name: req.body.name,
        sname: req.body.sname
    }).then(function () {
        res.sendStatus(200);
    })
});

//Видалити вчителя
app.post('/del-teach', function (req, res) {
    knex('teachers').where('id', req.body.id).del()
        .then(function () {
            res.sendStatus(200);
        })
});

//Отримати класи
app.get('/classes', function (req, res) {
    knex.select('classes.id as id' ,'classes.name as class','teachers.name as name','teachers.sname as sname').from('classes').innerJoin('teachers', 'classes.teachers_id', 'teachers.id')
     .then(function (classes) {
            res.status(200).send(classes)
        })
});

//Редагувати клас
app.post('/edit-class', function (req, res) {
    knex('classes').where('id', req.body.id).update({
        name: req.body.class,
        teachers_id: req.body.ct_index
    }).then(function () {
        res.sendStatus(200);
    })
});

//Видалити клас
app.post('/del-class', function (req, res) {
    knex('classes').where('id', req.body.id).del()
        .then(function () {
            res.sendStatus(200);
        })
});

app.post('/del-pup', function (req, res) {
    knex('pupils').where('id',req.body.id).del()
        .then(function () {
            res.sendStatus(200);
        })
});

//Отримати учнів
app.post('/pupils', function (req, res) {
    knex.select().from('pupils').where('id', req.body.id)
     .then(function (pupils) {
            res.status(200).send(pupils)
        })
});

//Редагувати вчителя
app.post('/edit-pupi', function (req, res) {
    knex('pupils').where('id', req.body.id).update({
        name: req.body.name,
        sname: req.body.sname
    }).then(function () {
        res.sendStatus(200);
    })
});



//
////Отримати вчителів
//app.get('/test01', function (req, res) {
//    knex.raw('DROP DATABASE IF EXISTS testtoday')
//        .then(function () {
//            console.log('good!');
//            res.sendStatus(200);
//        })
//});
////Отримати класи
//app.get('/classroom2', function (req, res) {
//    knex.select('classes.id as id' ,'classes.name as class','teachers.name as name','teachers.sname as sname').from('classes').innerJoin('teachers', 'classes.teachers_id', 'teachers.id')
//     .then(function (classes) {
//            res.status(200).send(classes)
//        })
//});
//Отримати вчителів
//app.get('/testos', function (req, res) {
//    knex.select('catagory').count('catagory as test').from('test').groupBy('catagory').having('test', '>', 2)
//        .then(function (test) {
//            res.status(200).send(test)
//        })
//});

//Усі інші адреси адресують на index.html
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

//Запуск серверу
app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});
