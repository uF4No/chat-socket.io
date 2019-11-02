var http = require('http');
const app = http.createServer(requestHandler)
var fs = require('fs');
var path = require('path');


app.listen(3000)
console.log('HTTP Server running at http://127.0.0.1:3000/');


// handles all http requests to the server
function requestHandler(request, response) {
    console.log('request ', request.url);

    var filePath = './client' + request.url;
    console.log(filePath)
    if (filePath == './client/') {
        filePath = './client/index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}

// we'll store the users in this object as socketId: username
const users = {}

var io = require('socket.io')(app);
// starts socket
io.on('connection', function (socket) {
  console.log('Socket.io started.....')
  // Manage all socket.io events next...
  socket.on('new-connection', (data) => {
    console.log(`new-connection event ${data.username}`)
    // adds user to list
    users[socket.id] = data.username
    socket.emit('welcome', { user: data.username, message: `Welcome to this Socket.io chat ${data.username}` });
  })
  socket.on('new-message', (data) => {
    console.log(`new-message event ${data}`);
    // broadcast message to all sockets except the one that triggered the event
    socket.broadcast.emit('broadcast-message', {user: users[data.user], message: data.message})
  });
});


