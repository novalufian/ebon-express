const routes = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');

const _auth = require('../controller/auth');
const _napi = require('../controller/napi');
const _kamar = require('../controller/kamar');
const _blok = require('../controller/blok');
const _subag = require('../controller/subag');
const _bon = require('../controller/bon');
const _user = require('../controller/user');
const _pegawai = require('../controller/pegawai');

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
	_bon.getAll(function (data) {res.send(data)})
});
routes.get('/bon/user', (req, res) => {
	_bon.getByUser(function (data) {res.send(data)})
});
routes.get('/bon/:bonid', (req, res) => {
	var id = req.params.bonid;
	_bon.getById(id, function (data) {res.send(data)})
});
routes.post('/bon',urlencodedParser,  (req, res) => {
	var cred = req.body;
	_bon.getAll(cred, function (data) {res.send(data)})
});
routes.put('/bon/:bonid',urlencodedParser,  (req, res) => {
	var cred = req.body;
	var id = req.params.bonid;
	// _bon.update(cred, id , function (data) {res.send(data)})
});
routes.put('/bon/status',urlencodedParser,  (req, res) => {
	var cred = req.body;
	_bon.updateStatus(cred , function (data) {res.send(data)})
});

// data napi 
routes.get('/napi/:offset', (req, res) => {
	var offset = req.params.offset;
	_napi.getAllListNapi(offset, function(data) {res.send(data)});
});
routes.get('/napi/:id', (req, res) => {
	var id = req.params.id;
	_napi.getOneNapi(id, function(data) {res.send(data)});
});
routes.get('/napi/kamar/:id/:offset', (req, res) => {
	var id = req.params.id;
	var offset = req.params.offset;
	_napi.getAllListNapiByKamar(id,offset, function(data) {res.send(data)});
});
// count napi
routes.get('/napi/count/all/:kamarid', (req, res) => {
	var kamarid = req.params.kamarid;
	_napi.countall(kamarid, function(data) {res.send(data)});
});
routes.get('/napi/count/unbook/:kamarid', (req, res) => {
	var kamarid = req.params.kamarid; 
	_napi.coutnunbooked(kamarid, function(data) {res.send(data)});
});
routes.get('/napi/count/subag/:subag/:kamarid', (req, res) => {
	var kamarid = req.params.kamarid;
	var subag = req.params.subag;
	_napi.countbysubag(subag, kamarid, function(data) {
		res.send(data)
	});
});
 
routes.post('/napi',urlencodedParser, (req, res) => {
	var cred = req.body;
	_napi.save(cred, function(data) {res.send(data)});
});
routes.post('/napi/book',urlencodedParser, (req, res) => {
	var cred = req.body;
	_napi.book_napi(cred, function(data) {res.send(data)});
}); 
routes.put('/napi/:id', (req, res) => {
	var cred = req.body;
	var id = req.params.id;
	_napi.update(cred, id, function(data) {res.send(data)});
});
routes.delete('/napi/:id', (req, res) => {
	var id = req.params.id;
	_napi.unpublish(id, function(data) {res.send(data)});
});


//kamar
routes.get('/kamar', (req, res) => { _kamar.getAllListKamar(function(data) {res.send(data)}); });
routes.get('/kamar/blok/:blokid', (req, res) => { 
	var id = req.params.blokid;
	_kamar.getKamarByBlok(id, function(data) {res.send(data)}); 
});
routes.get('/kamar/id/:kamarid', (req, res) => { 
	var id = req.params.kamarid;
	_kamar.getKamarOne(id, function(data) {res.send(data)}); 
});
routes.post('/kamar',urlencodedParser, (req, res) => { 
	var cred = req.body;
	_kamar.save(cred, function(data) {res.send(data)}); 
});
routes.put('/kamar',urlencodedParser, (req, res) => { 
	var cred = req.body;
	_kamar.update(cred, function(data) {res.send(data)}); 
});

//blok
routes.get('/blok', (req, res) => { _blok.getAllListBlok(function(data) {res.send(data)}); 
});


//subagian
routes.get('/subag', (req, res) => { _subag.getAll(function(data) {res.send(data)}); 
});
routes.get('/subag/:id', (req, res) => { 
	var id = req.params.id;
	_subag.getAll(id, function(data) {res.send(data)}); 
});
routes.post('/subag',urlencodedParser, (req, res) => { 
	var id = req.body;
	_subag.getAll(cred, function(data) {res.send(data)}); 
});
routes.put('/subag/:id',urlencodedParser, (req, res) => { 
	var id = req.params.id;
	var cred = req.body;
	_subag.getAll(cred, id , function(data) {res.send(data)}); 
});
routes.delete('/subag/:id', (req, res) => { 
	var id = req.params.id;
	_subag.getAll(id , function(data) {res.send(data)}); 
});

// user
routes.get('/user/role/:roleuser', (req, res) => {
	var role = req.params.rolesuer;
	_user.getAll(role, function (data) {res.send(data)})
})
routes.get('/user/:id/:roleuser', (req, res) => {
	var role = req.params.rolesuer;
	var id = req.params.id;
	_user.getOne(id, role, function (data) {res.send(data)})
})
routes.get('/user/:id', (req, res) => {
	var id = req.params.id;
	_user.getById(id, function (data) {res.send(data)})
})
routes.delete('/user/:id', (req, res) => {
	var id = req.params.id;
	_user.delete(id, function (data) {res.send(data)})
})
routes.post('/user', urlencodedParser, (req, res) => {
	var cred = req.body;
	_user.save(cred, function (data) {res.send(data)})
})
routes.put('/user', urlencodedParser, (req, res) => {
	var cred = req.body;
	_user.update(cred, function (data) {res.send(data)})
})

// pegawai
routes.get('/pegawai', (req, res) => {
	_pegawai.getAll( function (data) {res.send(data)})
})
routes.get('/pegawai/:id', (req, res) => {
	var id = req.params.id;
	_pegawai.getOne( id, function (data) {res.send(data)})
})
routes.post('/pegawai',urlencodedParser,  (req, res) => {
	var cred = req.body;
	_pegawai.save( cred, function (data) {res.send(data)})
})
routes.put('/pegawai/:id',urlencodedParser,  (req, res) => {
	var id = req.params.id;
	var cred = req.body;
	_pegawai.put( cred, id, function (data) {res.send(data)})
})
routes.delete('/pegawai/:id',  (req, res) => {
	var id = req.params.id;
	_pegawai.delete( id, function (data) {res.send(data)})
})

module.exports = routes;