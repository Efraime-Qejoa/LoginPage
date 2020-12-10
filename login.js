const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
var results;

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Hacker7564!',
	database : 'basiclogin'
});

const app = express();


//Encode & Decoding 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});
app.get('/home', function(request, response) {
    response.sendFile(path.join(__dirname + '/home.html'));
});

// Navigation 
app.post('/login', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
    if (username && password) {
// check if user exists
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error,fields) {
			const results = [0]
			if (results.length > 0) {
                response.redirect('/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }           
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.listen(3000);