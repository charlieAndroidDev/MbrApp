var http = require('http');
var fs = require("fs");

fs.readFile('index.html', function (err, html) {

    var server = http.createServer(function(request, response) {
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(html);
        
    });
        
    var port = process.env.PORT || 1337;
    server.listen(port);
        
    console.log("Server running at http://localhost:%d", port);

});