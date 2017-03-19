var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

/* Set the precompilers */
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

/* Specify the route for the static files */ 
app.use(express.static(__dirname + '/public'));

/* mongo init */
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error.....'));
db.once('open', function callback(){
    console.log('multivision db opened');
});

/* Render partial view */
app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

/* Render default index view */
app.get('*', function(req, res){
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port ' + port + '....');