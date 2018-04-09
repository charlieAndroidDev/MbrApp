var utilities = require('./utilities.js');
var fs = require("fs");

var actions = {
  'GET': function(request, response) {
    fs.readFile('index.html', function (err, html) {
        utilities.sendResponse(response, html);
    });
  },
  'POST': function(request, response) {

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
    req.write(request.body);
    req.end();

  }
};

module.exports = function(request, response) {
  var action = actions[request.method];
  if (action) action(request, response);
  else utilities.sendResponse(response, 'Not Found', 404);
};