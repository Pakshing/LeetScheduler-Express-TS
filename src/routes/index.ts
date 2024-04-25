import express from 'express';
import userRouter from './userRouter';
import questionRouter from './questionRouter';



const router = express.Router();

export default (): express.Router => {
    userRouter(router);
    questionRouter(router);


    return router;
};
