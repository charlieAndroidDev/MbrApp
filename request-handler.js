var utilities = require('./utilities.js');
var fs = require("fs");
var request = require('request');

var actions = {
  'GET': function(request, response) {
    fs.readFile('index.html', function (err, html) {
        utilities.sendResponse(response, html);
    });
  },
  'POST': function(request, response) {

    request.post(
        'http://176.126.244.22/insertEmpInfo.php',
        { body: request.body },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    );

  }
};

module.exports = function(request, response) {
  var action = actions[request.method];
  if (action) action(request, response);
  else utilities.sendResponse(response, 'Not Found', 404);
};