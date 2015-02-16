//server.js
//set up
var express   = require('express');
var app       = express();
var mongoose  = require('mongoose');
var morgan    = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = 8080;

//configuration
mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {'extended': 'true'} ));
app.use(bodyParser.json());
app.use(bodyParser.json( {type: 'application/vnd.api+json' }));
app.use(methodOverride());

//model
var Component = mongoose.model("Component", {
    name : String
//    approved : Boolean,
//    notes : String
    });

//routes
  //get all components
  app.get('/api/components', function(req, res) {
      Component.find(function(err, components) {
        if (err)
          res.send(err);
        res.json(components);
        });
      });

  //create component
  app.post('/api/components', function(req, res) {
      Component.create({
        name : req.body.text,
        done : false
        }, function(err, component) {
          if (err)
            res.send(err);

            Component.find(function(err,components) {
              if (err)
                res.send(err)
              res.json(components);
              });
            });
      });

  //delete component
  app.delete('/api/components/:component_id', function(req, res) {
      Component.remove( {
        _id : req.params.component_id
        }, function(err, component) {
          if (err)
            res.send(err);

            Component.find(function(err, components) {
              if (err)
                res.send(err)
              res.json(components);
              });
            });
      });

  //application
  app.get('*', function(req, res) {
      res.sendfile('./public/index.html');
      });


//listen
app.listen(port);
console.log("App listening on " + port);
