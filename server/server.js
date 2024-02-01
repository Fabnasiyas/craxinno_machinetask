import dbConnect from './config/connectDB.js';
import  Express from 'express';
import morgan from 'morgan';
import UserRoute from './routes/userRoutes.js'

const app = Express();
const port =  4000;

import cors from 'cors'
dbConnect();
app.use(Express.json({limit:"50mb"}));
app.use(morgan('dev'));
app.use(Express.urlencoded({ extended: true, limit:"50mb" }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use('/', UserRoute)


app.listen(port, () => { 
  console.log(`Server is running on http://localhost:${port}`);
});
