var http = require('http');
var fs = require("fs");
var url = require('url');
var handleRequest = require('./request-handler');
var utilities = require('./utilities');

var routes = {
    '/apply': handleRequest
};

var server = http.createServer(function(request, response) {
    
    //response.writeHead(200, {"Content-Type": "text/html"});
    //response.end(html);

    var urlParts = url.parse(request.url);
    var route = routes[parts.pathname];
  
    if (route) route(request, response);
    else utilities.sendResponse(response, 'Not Found', 404);
    
});
    
var port = process.env.PORT || 1337;
server.listen(port);
    
console.log("Server running at http://localhost:%d", port);
