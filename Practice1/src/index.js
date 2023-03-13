import './config/env.js'
import scheduledMessages from './config/scheduledMessage.js'
import connectDB from './config/db.js'
import httpServer from './config/http.js'


const bootstrap = async () => {

    await connectDB(process.env.MONGODB_URL);

    httpServer.listen(process.env.PORT, () => {
        console.log(`Escuchando en puerto ${process.env.PORT}`)
    })
}

bootstrap();
scheduledMessages();