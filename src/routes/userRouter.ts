import { User } from '../entities/User';
import express,{ Request, Response } from 'express';
import { myDataSource } from '../db/data-source';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv'


dotenv.config()

export default (router: express.Router): void => {
    router.get('/users', async(req:Request, res:Response) => {
        const users = await myDataSource.getRepository(User).find();
        res.json(users);
    });
    router.post('/users', async(req:Request, res:Response) => {
        const user = await myDataSource.getRepository(User).create(req.body);
        const result = await myDataSource.getRepository(User).save(user);
        return res.send(result);
    });

    
    router.post('/users/oauth2/github/authenticate', async (req: Request, res: Response) => {
            if(req.body === undefined || req.body.code === undefined){
                return res.status(400).json({ message: 'Code is required' });
            }
            const code = req.body.code;
            const accessToken = await getAccessToken(code);
            const email = await getUserEmail(accessToken);
    
            let user = await myDataSource.getRepository(User).findOneBy({ email: email });
            if (!user) {
                user = myDataSource.getRepository(User).create({ email: email, login_method: 'github' });
                await myDataSource.getRepository(User).save(user);
            }
    
            const token = jwt.sign({ email: user.email, login_method: user.login_method }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.cookie('token', token, { httpOnly: true });
            res.json({ message: `Welcome, ${email}!`, token: token });
        });

    router.post('/users/testUserLogin', async (req: Request, res: Response) => {
        const emailObj = req.body;
        const email = emailObj.email;
    
        let user = await myDataSource.getRepository(User).findOneBy({ email: email });
        if (!user) {
            user = myDataSource.getRepository(User).create({ email: email, login_method: 'local' });
            await myDataSource.getRepository(User).save(user);
        }

    
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const responseBody = { message: `Welcome, ${email}!`, token: token };
    
        return res.status(200).json(responseBody);
    });

}
    

async function getAccessToken(code: string): Promise<string> {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
    }, {
        headers: { Accept: 'application/json' },
    });

    return response.data.access_token;
}

async function getUserEmail(accessToken: string): Promise<string> {
    const response = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `token ${accessToken}` },
    });

    const primaryEmail = response.data.find((email: any) => email.primary === true && email.verified === true);
    return primaryEmail.email;
}

