
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var log4js = require('log4js');
var path = require('path');
var config = require('config');

var log = log4js.getLogger();
var app = express();

// all environments
app.set('port', process.env.PORT || 6400);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/', function(req, res){
  setTimeout(function(){
  log.debug("Started processing");
  var sum = req.body.LMI_PAYMENT_AMOUNT;
  var code = req.body.LMI_PAYMENT_NO;
  http.get("http://localhost:3000/accept?LMI_PAYMENT_NO=" + code);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end();}, 3000);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
