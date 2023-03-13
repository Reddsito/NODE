const { readFile } = require('fs/promises')
const { promisify } = require('util')


async function read() {
    try {
        const result = await readFile('./data/first.txt', 'utf-8');
        console.log(result);
        const result2 = await readFile('./data/second.txt', 'utf-8');
        console.log(result2);

    } catch(error) {
        console.log(error)
    } 

}

read();

