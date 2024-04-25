import express from 'express';
import { Request,Response } from 'express';
import "reflect-metadata";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { User } from './entities/User';
import { myDataSource } from './db/data-source';
import router from './routes';

//import router from './router';
import dotenv from 'dotenv'

dotenv.config() 
const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        server.listen(process.env.PORT, () => {
          console.log('Server running on port:'+process.env.PORT);
          }
      );
      
      app.get('/', (req, res) => {
          res.send("<h1>Hello World</h1>");
      }
      );
      
      app.use('/api/v1', router());
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })




// register routes



// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         console.log("Mongoose connected");
//         server.listen(process.env.PORT, () => {
//           console.log('Server running on http://localhost:'+process.env.PORT);
//         });
        
//     })
//     .catch(console.error);






