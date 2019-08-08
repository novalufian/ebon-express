const express = require('express');
const app = express();
const routes = require('./app/routing/route');
const path = require('path');

app.set('views', './app/view');
app.set('view engine', 'ejs');
app.use('/', routes);
app.use(express.static('public'))

app.listen(3000, () => console.log('Example app listening on port 3000!'));