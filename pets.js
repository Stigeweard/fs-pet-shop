#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const node = path.basename(process.argv[0]);
const dir = path.basename(process.argv[1]);
const cmd = process.argv[2];
const secondArg = process.argv[3];
const thirdArg = process.argv[4];
const fourthArg = process.argv[5];
const fifthArg = process.argv[6];

function newPet(age, kind, name) {
    const petAge = parseInt(age, 10);
    const petKind = kind;
    const petName = name;
    const petObj = {
        age: petAge,
        kind: petKind,
        name: petName,
    };
    return petObj;
}

if (!cmd) {
    console.error(`Usage: ${node} ${dir} [read | create | update | destroy]`);
    process.exit(1);
} else if (cmd === 'read') {
    fs.readFile('pets.json', (err, data) => {
        const petData = JSON.parse(data);
        if (err) {
            throw err;
        } else if (!secondArg) {
            console.log(petData);
        } else if (secondArg >= petData.length || secondArg < 0 || isNaN(secondArg)) {
                console.error(`Usage: ${node} ${dir} ${cmd} INDEX`);
                process.exit[1];
            } else {
                console.log(petData[secondArg]);
            }
    });
} else if (cmd === 'create') {
    fs.readFile('pets.json', (err, data) => {
        if (err) {
            throw err;
        }

        if (!thirdArg || !fourthArg || !secondArg || isNaN(secondArg)) {
            console.error(`Usage: ${node} ${dir} ${cmd} AGE KIND NAME`);
            process.exit(1);
        } else {
            let pets = JSON.parse(data);

            pets.push(newPet(secondArg, thirdArg, fourthArg));
            pets = JSON.stringify(pets);

            fs.writeFile('pets.json', pets, (writeErr, data) => {
                if (writeErr) {
                    throw writeErr;
                } else {
                    console.log(newPet(secondArg, thirdArg, fourthArg));
                }
            });
        }
    });
} else if (cmd === 'update') {
    fs.readFile('pets.json', (err, data) => {
        if (err) {
            throw err;
        }
        if (!thirdArg || !fourthArg || !secondArg || !fifthArg) {
            console.error(`Usage: ${node} ${dir} ${cmd} INDEX AGE KIND NAME`);
            process.exit(1);
        } else {
            let pets = JSON.parse(data);
            pets[secondArg] = newPet(thirdArg, fourthArg, fifthArg);
            pets = JSON.stringify(pets);

            fs.writeFile('pets.json', pets, (writeErr, data) => {
                if (writeErr) {
                    throw writeErr;
                } else {
                    console.log(newPet(thirdArg, fourthArg, fifthArg));
                }
            });
        }
    });
} else if (cmd === 'destroy') {
    fs.readFile('pets.json', (err, data) => {
        if (err) {
            throw err;
        }

        if (!secondArg) {
            console.error(`Usage: ${node} ${dir} ${cmd} INDEX`);
            process.exit(1);
        } else {
            let pets = JSON.parse(data);
            const destroyedPet = pets.splice(secondArg, 1);
            pets = JSON.stringify(pets);

            fs.writeFile('pets.json', pets, (writeErr, data) => {
                if (writeErr) {
                    throw writeErr;
                } else {
                    console.log(destroyedPet[0]);
                }
            });
        }
    });
}
