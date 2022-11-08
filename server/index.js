require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router/index')
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/error-middleware')
const instagram = require('./instagram')


const PORT = process.env.PORT || 5000
const app = express()

const corsOptions ={
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        await instagram.init()

        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON PORT 5000`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()