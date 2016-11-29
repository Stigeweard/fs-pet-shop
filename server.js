'use strict';
const http = require('http');
const port = 8080;

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

function fetchPets() {
    let petData = null;

    return petData;
}

function handleRequest(req, res) {
    if (req.method === 'GET' && req.url === '/pets') {
        fs.readFile(petsPath, (err, data) => {
            res.setHeader('Content-Type', 'application/json');
            let petData = JSON.parse(data);
            console.log(petData);
            res.end(JSON.stringify(petData));
        })
    }
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('It works! Path: ' + req.url);
}

const server = http.createServer(handleRequest);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('Server listening on port: ', port);
});

// http.get('/pets')
