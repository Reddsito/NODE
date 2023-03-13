
//Crear servidor sin express
// import http from 'http'
// import fs from 'fs'

// const server = http.createServer((req, res) => {
//     const read = fs.createReadStream('./static/index.html');
//     read.pipe(res);
// })

// server.listen(3000);
// console.log(`Server on port ${3000}`)

//Crear servidor con express
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {connectDb} = require('./db')
require('ejs')

connectDb();

const app = express();

const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/users')


app.set('appName', 'Express Tutorial')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


//Se utiliza para  que express procese el texto que recibirá
app.use(express.text())
//Se utiliza para  que express procese el json que recibirá
app.use(express.json())
//Se utiliza para  que express procese los datos en formato form que recibirá
app.use(express.urlencoded({extended: false}))

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))

//Exportar routes
app.use(homeRoutes)
app.use(userRoutes)



// res.json() para mandar json
// res.send() mandar texto
// res.sendFile() mandar file
//colocar los : hace que el siguiente valor sea un parametr que luego puedes utilizar con req.params

//colocar ?variable=valor en la URL del sitio web, hace que mandas Querys, los cuales puedes recibir con req.query

//En caso de que mandes dos query con el mismo nombre de variable, recibes un objeto de un arreglo con ambos valores
app.get('/user/:name', (req, res) => {
    console.log(req.query)
    res.send(`Usuario ${req.params.name}`)
})

app.get('/users/:username/photo', (req, res) => {
    if(req.params.username === "redd") {
       return res.sendFile('./Cerdito.jpg', {
            root: __dirname
        })
    } 

        
    res.send("El usuario no tiene acesso")
    

   
})


app.get('/add/:x/:y', (req, res) => {


    const {x, y} = req.params
    console.log(x)
    console.log(y)


    const result = parseInt(x) + parseInt(y)
    console.log(result)

    res.send(`Result: ${result}`)
}) 


app.use( (req, res, next) => {
    if(req.query.login === 'secretPassword') {
        next();
    } else {
        res.send("NO TIENES ACCESO")    
    }
})


app.get('/secretSite', (req, res) => {
    res.send("SECRETO")
})



//Colocamos el primer /public, para que la URL tenga que tener /public para acceder a todas las carpetas.




 //Sería como un else en caso de nada de lo que está arriba se ejecute, el se ejecuta
 app.use( (req,res, next) => {
    res.send("no existe pagina")
})



app.listen(3000);
console.log(`server ${app.get('appName')} on port ${3000}`)