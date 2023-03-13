const http = require('http')
const {createReadStream} = require('fs')

const server = http.createServer ((req, res) => {
    const fileStream = createReadStream('./data/bigFile.txt', {
        encoding: 'utf-8'
    })

    fileStream.on('data', (chunk) => {
        fileStream.pipe(res);
    })
})

server.listen(3000);
console.log("Servidor encendido")