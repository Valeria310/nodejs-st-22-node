const csv = require('csvtojson');
const fs = require('fs');
const { pipeline, Transform } = require('stream');

const pathToCsv = './csv/nodejs-hw1-ex1.csv';

const a = new Transform({
    transform(ch, code, callb) {
        callb();
    },
});

pipeline(
    fs.createReadStream(pathToCsv),
    csv().subscribe((jsonObj) => {
        return new Promise((resolve, reject) => {
            const values = Object.values(jsonObj).join('.').split(';');
            const oldKeys = Object.keys(jsonObj);
            const newKeys = oldKeys[0].split(';');
            for (let i = 0; i < oldKeys.length; i++) {
                delete jsonObj[oldKeys[i]];
            }
            for (let i = 0; i < newKeys.length; i++) {
                jsonObj[newKeys[i].toLowerCase()] = values[i];
            }
            resolve();
        });
    }),
    fs.createWriteStream('./csv/test.txt'),
    (error) => {
        if (error) console.error(error);
    },
);
