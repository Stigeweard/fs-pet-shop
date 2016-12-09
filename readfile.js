const fs = require('fs');

function readFile(cb) {
    fs.readFile('pets.json', (err, data) => {
        if(err) throw err;
        cb(JSON.parse(data));
    })
};

module.exports = readFile;
