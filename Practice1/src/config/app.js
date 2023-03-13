import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import path from 'path'
import { fileURLToPath } from "url";
import homeRoutes from "../routes/home.routes.js";
import userRouter from "../routes/user.routes.js";


const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()


// Settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))



// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())



// Static Files
app.use('/public',express.static(path.join(__dirname, '../public')))



// Routes
app.use('', homeRoutes)
app.use('/user', userRouter)

// Default

app.use( (req, res, next) => {
    res.status(404).render('404')
})


export default app;
