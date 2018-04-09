var http = require('http');
var express = require("express");
const app = new express();

app.get('/', function(request, response){
    response.sendfile('index.html');
});