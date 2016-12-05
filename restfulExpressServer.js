'use strict';

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;

const server = express();

server.use(bodyParser.json());
server.use(morgan('short'));

server.get('/pets', (req, res) => {
    fs.readFile('pets.json', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        res.send(parsedData);
    });
});

server.get('/pets/:id', (req, res) => {
    let index = req.params.id;
    fs.readFile('pets.json', (err, data) => {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        if (isNaN(Number(index)) || index >= parsedData.length || index < 0) {
            res.sendStatus(404);
        };
        res.send(parsedData[index]);
    });
});

server.post('/pets', (req, res) => {
    fs.readFile('pets.json', (err, data) => {
        let name = req.body.name;
        let age = req.body.age;
        let kind = req.body.kind;
        if (!name || !age || !kind) {
            res.header('Content-Type', 'text/plain');
            res.sendStatus(400);
            res.end('error');
        } else {
            let pet = {
                name,
                age,
                kind
            };
            let petsJSON = JSON.parse(data);
            petsJSON.push(pet);
            fs.writeFile('pets.json', JSON.stringify(petsJSON), (err) => {
                if (err) throw err;
            })
            res.header('Content-Type', 'application/json');
            console.log(pet);
            res.end(JSON.stringify(pet));
        }
    });
});

server.put('/pets/:id', (req, res) => {
    let index = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
    let kind = req.body.kind;
    if (!name || !age || !kind) {
        res.header('Content-Type', 'text/plain');
        res.sendStatus(400);
        res.end('error');
    } else {
        fs.readFile('pets.json', (err, data) => {

            let pet = {
                name,
                age,
                kind
            };
            let petsJSON = JSON.parse(data);
            petsJSON[index] = pet;
            fs.writeFile('pets.json', JSON.stringify(petsJSON), (err) => {
                if (err) throw err;
            })
            res.header('Content-Type', 'application/json');
            console.log(pet);
            res.end(JSON.stringify(pet));
        })


    }

});

server.delete('/pets/:id', (req, res) => {
    fs.readFile('pets.json', (err, data) => {

        let index = req.params.id;

        let petsJSON = JSON.parse(data);
        let deleted = petsJSON.splice(index, 1);
        fs.writeFile('pets.json', JSON.stringify(petsJSON), (err) => {
            if (err) throw err;
        })
        res.header('Content-Type', 'application/json');
        res.send(JSON.stringify(deleted[0]));
    })

})

server.listen(port, (err) => {
    if (err) throw err;
    console.log('Server listening at port:', port);
});

module.exports = server;
