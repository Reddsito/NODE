//Este módulo te permite recibir solicitudes y mandar respuestas mediante el protocolo http.

const http = require('http');


//El request es un objeto que trae toda la data del cliente, y podemos utilizar la URL para poder interactuar y saber que nos está pidiendo el cliente.


http.createServer( (request,response) => {

    if(request.url === '/') {
    
        response.write("Bienvenido a Reddsito");
        return response.end(); 

    }

    if(request.url === '/about') {
           
    //Siempre debes finalizar el response.
        response.write('Acerca de ');
        return response.end();
    }

    response.write("Error 404");
    response.end(); 
 
    //Hay que tener en cuenta que siempre hay que retornar luego de un response, ya que luego el servidor se cae porque no puede regresar luego de cerrar el response.

    //El listen sirve para que siempre se esté corriendo el servidor y pueda responder a cualquier llamado, el número es el puerto, recomendar poner siempre arriba de 3000 para que no choque con los puertos que ya se utilizar por el sistema operativo.
} ).listen(3000)

console.log('Servidor escuchando en el puerto 3000')

