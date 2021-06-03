const express = require('express');
const path = require('path');
const { database } = require('./config/connection');

const rts_user = require('./routes/user');
const rts_msg = require('./routes/message');
const rts_img = require('./routes/image');
const rts_cmt = require('./routes/comment');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, './images')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rts_user);
app.use('/messages', rts_msg);
app.use('/images', rts_img);
app.use('/comments', rts_cmt);

// database.sync({ force: true });

app.use(function (err, req, res, next) {
    console.log('This is the invalid field ->', err.field)
    next(err)
  })
  

module.exports = app;