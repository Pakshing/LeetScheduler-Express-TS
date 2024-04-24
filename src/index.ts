import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

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

server.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:'+process.env.PORT);
    }
);

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
}
);


// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         console.log("Mongoose connected");
//         server.listen(process.env.PORT, () => {
//           console.log('Server running on http://localhost:'+process.env.PORT);
//         });
        
//     })
//     .catch(console.error);






