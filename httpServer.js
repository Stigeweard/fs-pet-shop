'use strict';
const http = require('http');
const port = 8080;
const routes = require('./routes.js')

function handleRequest(req, res) {
    console.log(req.method);
    if (req.method === 'GET') {
        let contentAfterSlash = /[^/]*$/.exec(req.url)[0];
        if (contentAfterSlash === 'pets') {
            routes[req.url](req, res);
        } else if (!isNaN(Number(contentAfterSlash, 10))) {
            if (contentAfterSlash === '') {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                routes[`/pets/#`](req, res);
            }
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.end('Not Found');
        }
    }
}

const server = http.createServer(handleReq
    uest);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log('Server listening on port: ', port);
});

module.exports = server;
