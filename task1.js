import { Transform } from 'stream';
import { stdin, stdout } from 'process';

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
