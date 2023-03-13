//fs viene de file system, es un módulo de node que te permite interactuar con files como crearlos o leerlos.

//Puedes hacerlo de manera asíncrona o sincrónica que es cuando sus funciones tienen (Sync)
const { writeFile } = require('fs/promises');
const fs = require('fs');


//Te devuelve un valor en buffer, tienes que convertirlo a String.
fs.readFileSync('./data/first.txt', 'utf-8');
fs.readFileSync('./data/second.txt').toString;

console.log(fs.readFileSync('./data/first.txt', 'utf-8'))
console.log(fs.readFileSync('./data/second.txt').toString() )

//Crear un archivo.

fs.writeFileSync('./data/third.txt', 'Soy archivo 3', {
    flag: 'a'
});

//Para agregar algo al archivo, colocas un objeto con el atributo flag: 'a'

fs.readFileSync('./data/third.txt', 'utf-8')

console.log(fs.readFileSync('./data/third.txt', 'utf-8'))

const createBigFile = async () => {
    await writeFile('./data/bigFile.txt', 'hello word'.repeat(100000))
}

createBigFile()