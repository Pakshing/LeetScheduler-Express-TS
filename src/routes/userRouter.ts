import { User } from '../entities/User';
import express,{ Request, Response } from 'express';
import { myDataSource } from '../db/data-source';


export default (router: express.Router): void => {
    router.get('/users', async(req:Request, res:Response) => {
        const users = await myDataSource.getRepository(User).find();
        res.json(users);
    });
    router.post('/users', async(req:Request, res:Response) => {
        const user = await myDataSource.getRepository(User).create(req.body);
        const result = await myDataSource.getRepository(User).save(user);
        return res.send(result);
    }
    
    
    );
}
