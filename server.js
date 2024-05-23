
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import eventRoutes from './routes/evenement.js'
import reservationRoutes from './routes/reservation.js'

const app = express()
const hostname ="127.0.0.1"
const port=process.env.PORT || 9090
const databasename ="traveltech" 

mongoose.set('debug',true);
mongoose.Promise = global.Promise;

const db_url =process.env.DB_URL ||"mongodb://127.0.0.1:27017"
mongoose.connect(`${db_url}/${databasename}`)
.then(()=>{
    console.log("__ database connected __")
})
.catch((err)=> {
    console.log(`failed ${err}`)
})


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.use('/evenement', eventRoutes)
app.use('/reservation', reservationRoutes)

app.use(notFoundError);
app.use(errorHandler);

app.listen(port,hostname,()=>{
    console.log(`server running http://${hostname}:${port} `)
}
)