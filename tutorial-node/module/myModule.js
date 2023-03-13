const myWebAddress = 'reddsito.com';
const myNumber = 30;


//Maneras de importar
// - Como objeto

// aquí no escribimos el valor de cada objeto, ya que al utilizar el mismo nombre de variable, Javascript interpreta que es el objeto con el mismo nombre en nuestro programa.

// module.exports = {
//     myWebAddress,
//     myNumber
// }

// - Como variable individual.

// module.exports.myWebAddress = myWebAddress;
// module.exports.myNumber = myNumber;

// Importar con el EXPORT de EcmaScript

export default {
    myWebAddress,
    myNumber
}