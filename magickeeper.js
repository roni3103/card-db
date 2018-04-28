var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
// Using './' means we can pick up the config and it's not treated as 
const config = require('./config');
const cmd = require('node-cmd');

//variables
var collection;
var allMagic;
var resultObj;

//Where to look for the home page?
app.use(express.static(__dirname + '/mtgkeeper'));

// Connect to the db
MongoClient.connect((config.dbUrl), function(err, db) {
  //Any problems display an error in the terminal
  if(err) { return console.dir(err); }

  //Choose the collection to use
  collection = db.collection('mtgkeeper');

  //find everything in the collection for a start
  allMagic = collection.find().toArray(function(err, results) {
    //pass the results to an object so we can do things with it below
    resultObj=results;

  })

  //import from the csvs
  // importCsv = function(csvFileName) {
  //   cmd.run(`'mongoimport -h ds251179.mlab.com:51179 -d magickeeper -c mtgkeeper -u roni -p training123 --file ../${csvFileName}.csv --type csv --headerline'`)
  // }
  // csvFileName = "test-deck-2";
  // builtCommand = 'mongoimport -h ds251179.mlab.com:51179 -d magickeeper -c mtgkeeper -u roni -p training123 --file ../' + csvFileName +'.csv --type csv --headerline';
  // cmd.run(builtCommand);

  importCsv = function(csvFileName) {
    file = csvFileName;
    builtCommand = 'mongoimport -h ds251179.mlab.com:51179 -d magickeeper -c mtgkeeper -u roni -p training123 --file ../' + file +'.csv --type csv --headerline';
    cmd.run(builtCommand);
    
  }

});



// when a get request is made on the url /shop then the response sends the appropriate file
// left in as an example

// app.get('/shop', function (req, res) {
//    res.sendFile(path.join(__dirname + '/dollproject/products.html'));
// });
//

// Or using with parameters - again left in for Example

/*app.get('/:name', function(req,res) {
res.send('Hello ' + req.params.name);
});*/

app.get('/allMagic', function (req, res, next) {
  //display the JSON object
  res.json(resultObj);
  next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
