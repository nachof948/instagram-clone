import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import connectDB from './db/conecctionDB.js'
import authRoute from './routes/Auth.js'
import userRoute from './routes/User.js'
import messageRoute from './routes/Message.js'
import postRoute from './routes/Post.js'
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.get('/', (_, res) =>{
    res.send('<h1>Bienvenido al Clone de Instagram</h1>')
})

app.use('/',authRoute);
app.use('/user', userRoute);
app.use('/message', messageRoute);
app.use('/post', postRoute);


const start = async () =>{
    try {
    await connectDB(process.env.MONGO_URL)
    app.listen(process.env.PUERTO)
    console.log('Se conecto a la base de datos')
    } catch (error) {
        console.log('No se conecto a la base de datos')
    }
}
start();