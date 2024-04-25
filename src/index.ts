import express from 'express';
import { Request,Response } from 'express';
import "reflect-metadata";
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { User } from './entity/User';
import { myDataSource } from './db/data-source';

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
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


server.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:'+process.env.PORT);
    }
);

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
}
);

app.get("/users", async function (req: Request, res: Response) {
  const users = await myDataSource.getRepository(User).find()
  res.json(users)
})

app.get("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to return user by id
})

app.post("/users", function (req: Request, res: Response) {
  // here we will have logic to save a user
})

app.put("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to update a user by a given user id
})

app.delete("/users/:id", function (req: Request, res: Response) {
  // here we will have logic to delete a user by a given user id
})


// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         console.log("Mongoose connected");
//         server.listen(process.env.PORT, () => {
//           console.log('Server running on http://localhost:'+process.env.PORT);
//         });
        
//     })
//     .catch(console.error);






