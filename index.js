var http = require('http');
var express = require("express");
var app = new express();

app.get('/', function(request, response){
    response.sendfile('index.html');
});