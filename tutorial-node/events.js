const EventEmitter = require('events');

//Creamos este objeto que nos permitirá escuchar eventos.
const customEmitter = new EventEmitter()

//Los dos eventos mas importantes son "emit" que sería como click, al enviar un dato, al recibir un dato, y está "on" que es cuando pase determinado evento, has esto.

//Primero se crea el evento
customEmitter.on('response', (data, secondData) => {
    console.log(data)
    console.log(secondData)
})

//Luego lo llamas, al reves no se puede.
customEmitter.emit('response', 'posible data', [1,2,3]);