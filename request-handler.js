var utilities = require('./utilities.js');

var actions = {
  'GET': function(request, response) {
    fs.readFile('index.html', function (err, html) {
        utilities.sendResponse(response, html);
    });
  },
  'POST': function(request, response) {

  }
};

module.exports = function(request, response) {
  var action = actions[request.method];
  if (action) action(request, response);
  else utilities.sendResponse(response, 'Not Found', 404);
};