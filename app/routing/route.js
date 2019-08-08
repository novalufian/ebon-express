const routes = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');

const _auth = require('../controller/auth');
const _napi = require('../controller/napi');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// get content
routes.get('/content/:template', (req, res) => {
	res.sendFile(path.join(__dirname + `/../view/page/${req.params.template}.ejs`));
});

// get index
routes.get('/', (req, res) => {
	res.render('index');
});

// login
routes.post('/login', urlencodedParser, function (req, res) {
	var cred = req.body;
	_auth.login( cred, function(data) {res.send(data)});
})

// bon
routes.get('/bon', (req, res) => {
	res.render('index');
});

// data napi 
routes.get('/napi', (req, res) => {
	_napi.getAllListNapi(function(data) {res.send(data)});
});





module.exports = routes;