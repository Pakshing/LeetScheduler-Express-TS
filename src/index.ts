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
import dotenv from 'dotenv'

dotenv.config() 
const app = express();

const allowedOrigins = [process.env.LOCAL_HOST, process.env.PROD_HOST];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(compression());
app.use(cookieParser(process.env.JWT_SECRET));
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






