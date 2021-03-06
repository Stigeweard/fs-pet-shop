'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 8080;

const petsPath = path.join(__dirname, 'pets.json');

const server = express();

server.get('/pets', (req, res) => {
    fs.readFile(petsPath, (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    })
})

server.get('/pets/:index', (req, res) => {
    let index = Number.parseInt(req.params.index);
    fs.readFile(petsPath, (err, data) => {
        let parsedData = JSON.parse(data);
        if (err) throw err;
        if (!parsedData[index]) {
            return res.sendStatus(404);
        }
        res.send(parsedData[index]);
    })

})


server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('Server listening on port:', port);
});

module.exports = server;
