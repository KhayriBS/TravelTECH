import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session';
import passport from './config/passport.js'; 
import userRouter from './routes/utilisateur.js'
import { errorHandler, notFoundError } from './middlewares/errorhandler.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express()
const hostname ="127.0.0.1"
const port=process.env.PORT || 9090
const databasename ="traveltech" 
const db_url =process.env.DB_URL ||"mongodb://127.0.0.1:27017"
mongoose.connect(`${db_url}/${databasename}`)
.then(() => {
    console.log("__ Database connected __");
})
.catch((err) => {
    console.error(`Failed to connect to database: ${err}`);
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors())
app.use('/img',express.static('public/images'));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userRouter)
app.use(notFoundError)
app.use(errorHandler)
app.listen(port,hostname,()=>{
console.log(`server running http://${hostname}:${port} `)
}
)