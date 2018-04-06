var http = require('http');
var qs = require('querystring');

var server = http.createServer(function(request, response) {

    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(post['message']);
        });
    } else {
        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Hello World!");

    }

    

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
