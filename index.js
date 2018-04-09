var http = require('http');
var url = require('url');
var handleRequest = require('./request-handler.js');
var handlePostRequest = require('./post-request-hadler.js');
var utilities = require('./utilities.js');

var routes = {
    '/apply': handleRequest,
    '/submitEmployment': handlePostRequest
};

var server = http.createServer(function(request, response) {
    
    //response.writeHead(200, {"Content-Type": "text/html"});
    //response.end(html);

    var urlParts = url.parse(request.url);
    var route = routes[urlParts.pathname];

    if(route && request.method == "POST") {
        var body = '';
        
        request.on('data', function (data) {
            body += data;
    
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        console.log("BODY: " + body);

        route(request, response, body);
    }
  
    if (route) route(request, response);
    else utilities.sendResponse(response, 'Not Found', 404);
    
});
    
var port = process.env.PORT || 1337;
server.listen(port);
    
console.log("Server running at http://localhost:%d", port);
