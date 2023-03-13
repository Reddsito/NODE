// Path: Te permite trabajar con archivos y carpetas.Path

// *Cuando quieres importar un módulo de node, no colocas el ./ ya que no está en la carpeta de trabajo.

const { default: nodeTest } = require('node:test');
const path = require('path');

console.log(path)

//Path te cambia automáticamente la URL a el sistema operativo que estés, mediante el módulo OS, que te permite saber en qué sistema operativo se está ejecutando.

// path.join('public', 'node', 'styles.css') : te permite unir diferentes rutas y te la crea en el sistema.

// path.basename : te permite extraer la ruta final de una URL.

//path.dirname : te permite saber el la URL del directorio sin la ruta final.

//path.parse : te permite convertir la ruta en un objeto, te lo separa.

//path.resolve: te permite autocomplementar algun archivo para buscar la ruta donde se encuentra.