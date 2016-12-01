const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

routes = {
    '/pets': (req, res) => {
        fs.readFile(petsPath, (err, data) => {
            res.setHeader('Content-Type', 'application/json');
            let petData = JSON.parse(data);
            res.end(JSON.stringify(petData));
        })
    },
    '/pets/#': (req, res) => {
        let contentAfterSlash = /[^/]*$/.exec(req.url)[0];
        fs.readFile(petsPath, (err, data) => {
            res.setHeader('Content-Type', 'application/json');
            let petData = JSON.parse(data);
            if (Number(contentAfterSlash, 10) >= petData.length || Number(contentAfterSlash, 10) < 0) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.end(JSON.stringify(petData[Number(contentAfterSlash, 10)]));
            }
        })
    }
}

module.exports = routes;
