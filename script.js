const { Transform } = require('stream');
const { stdin, stdout } = require('process');

const reverce = new Transform({
    transform(chunk, encoding, callback) {
        callback();
    },
});

stdin.on('data', (data) => {
    reverce._transform(data, 'utf-8', () => {
        data = data.reverse();
    });
    stdout.write(data + '\n');
});
