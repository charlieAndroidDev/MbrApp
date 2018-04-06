var http = require('http');
var qs = require('querystring');
var crypto = require("crypto");

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

            var uniqueId = post['unique_id'];
            var payloadSize = post['payload_size'];

            // Hex string assigns 2 chars to each byte
            var randomData = crypto.randomBytes(payloadSize * 500).toString('hex');
            console.log("Data: %s", randomData);

            var obj = new Object();
            obj.requestId = uniqueId;
            obj.timestamp = Date.now();
            obj.payload = randomData;
            var jsonString= JSON.stringify(obj);
            
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(jsonString);
        });
    } else {
        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Hello World!");

    }

    

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
