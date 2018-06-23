//Setting up dependencies
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


//Setting up a port to view in browser during development
var port = process.env.PORT || 8000;


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));//Mounting MiddleWare, software to act as a bridge between an operating system/database and its applications. Returns middleware that only parses 'urlencoded' bodies and only looks at requests where the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.json());//Returns middleware that only parses 'json' and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(express.static(__dirname + '/views'));//Used to serve static files such as images, CSS files, and JS files. Looking for a folder called 'public' to host these static files - express.static() - built-in middleware function in Express

// var animalController = require('./controls/animalControl.js');

// app.post('/animals', animalController.create);
// app.get('/animals', animalController.read);
// app.get('/animals/:id', animalController.readById);
// app.put('/animals/:id', animalController.update);
// app.delete('/animals/:id', animalController.delete);


if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}


mongoose.connect('mongodb://localhost/paymentApi');//Mongoose = ORM (Object Relational Mapper) - connectivity point to database. Run in terminal - sudo mongod; sets up connection to database
mongoose.connection.once('useMongoClient', function(){
	console.log("Connected to your database.");
});


app.get('/', function (req, res){
	//res.json({message: 'Hello world'})//Hello-world json message to reflect in browser upon server creation
  res.render('index');
});

//Activate port to then render our development work
app.listen(port);

//Console.log in terminal to see browser port active and ready for use
console.log('winning on ' + port);