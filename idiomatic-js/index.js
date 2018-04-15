var express = require('express'),
    app = express(),
    port = 3000,
    // port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set("view options", {
    layout: false
});

var routes = require('./public/js/routing/router');

app.get('/', function (req, res) {
    res.render('public/index.html');
});

routes(app); //register the route

app.listen(port);

console.log('App is up and running on port: ' + port);