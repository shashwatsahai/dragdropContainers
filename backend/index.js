const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const container = require('./models/container');
var port = process.env.port || 3000;

var url = "mongodb://localhost:27017/containerDb";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED");
});

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/add-container', (req, res) => {
  console.log('here')
  var cont = new container({
    name: req.query.name,
    id: req.query.id
  })

  cont.save().then(function () {
    console.log('Saved to db')
    res.set('Content-Type', 'text/plain');
    res.send('Added Container ' + req.query.name);
  });
});

app.get('/add-inventory', (req, res) => {

  var containerId = req.query.cont;
  var item = req.query.name;
  container.findOne({id: containerId}, function(err, foundObject){
    if(err){
      console.log(err);
      res.status(500).send();
    } else {
      if(!foundObject){
        res.status(404).send();
      } else {
        
        if(item){
          foundObject.items.push(item);
        }
        console.log(foundObject);
        foundObject.save().then(function(){
          res.set('Content-Type', 'text/plain');
          res.send('Added Inventory item ' + item + ' to containerId = ' + containerId );
        })
      }
    }
  })
  // db.container.update(
  //   {id:req.query.cont},
  //   {$push: {items:req.query.name}}
  // );
});

app.get('/delete-inventory', (req, res) => {
  var containerId = req.query.cont;
  var item = req.query.name;
  container.findOne({id: containerId}, function(err, foundObject){
    if(err){
      console.log(err);
      res.status(500).send();
    } else {
      if(!foundObject){
        res.status(404).send();
      } else {
       
        if(item){
          debugger;
          var index = foundObject['items'].indexOf(item);
          if (index > -1) {
            foundObject['items'].splice(index, 1);
          }
          console.log(foundObject);
        }
        foundObject.save().then(function(){
          res.set('Content-Type', 'text/plain');
          res.send('Deleted Inventory item ' + item + ' to containerId = ' + containerId );
        })
      }
    }
  })
})

app.get('/delete-container', (req, res) => {
  var containerId = req.query.cont;
  container.deleteOne({id: containerId}, function(err, foundObject){
    res.set('Content-Type', 'text/plain');
    res.send('Deleted container' + containerId);
  });
});

app.get('/show-all', (req, res) => {
  container.find({}, function(err, containerdata){
    debugger;
    res.json(containerdata);

  });
})
app.listen(port);