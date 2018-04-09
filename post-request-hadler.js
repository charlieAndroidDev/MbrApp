var http = require('http');
var utilities = require('./utilities.js');

var actions = {
    'POST': function(request, response, body) {
        
            var options = {
                hostname: '176.126.244.22',
                port: 80,
                path: '/CloudProj/insertEmpInfo.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
              };
        
            var req = http.request(options, function(res) {
                console.log('Status: ' + res.statusCode);
                console.log('Headers: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (body) {
                  console.log('Body: ' + body);
                });
              });
            req.on('error', function(e) {
              console.log('problem with request: ' + e.message);
            });
            // write data to request body
        
            console.log(body);
            req.writeHead(200, {"Content-Type": "text/html"});
            req.end(body);
        
          }
};

module.exports = function(request, response, body) {
  var action = actions[request.method];
  if (action) action(request, response, body);
  else utilities.sendResponse(response, 'Not Found', 404);
};