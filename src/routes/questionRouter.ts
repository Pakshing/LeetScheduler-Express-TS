import { Question } from '../entities/Question';
import { User } from '../entities/User';
import express,{ Request, Response } from 'express';
import { myDataSource } from '../db/data-source';
import { getEmailFromToken } from './util';
import jwt from 'jsonwebtoken';
import axios from 'axios';


export default (router = express.Router()): void => {

    router.get('/questions/find', async(req:Request, res:Response) => {
        console.log("req.header",req.headers)
        const email = getEmailFromToken(req, process.env.JWT_SECRET);
        console.log("email",email)
        const userRepository = myDataSource.getRepository(User);
        const questionRepository = myDataSource.getRepository(Question);
        if (!email){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await userRepository.findOneBy({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        const questions = await questionRepository.find({ where: { owner: {id:user.id} } });

        res.json(questions);
    });

    router.post('/questions', async(req: Request, res: Response) => {
        const email = getEmailFromToken(req, process.env.JWT_SECRET);
        const userRepository = myDataSource.getRepository(User);
        const questionRepository = myDataSource.getRepository(Question);
        const { url, title, difficulty, tags, next_review_in_days } = req.body;
        const last_completion = new Date();
        
        if (!email){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await userRepository.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        
        const existingQuestion = await questionRepository.findOne({
            where: {
                title: title,
                owner: { id: user.id }
            },
            relations: ['owner']
        });

        if (existingQuestion) {
            return res.status(400).json({ message: 'Question already exists' });
        }

        const newQuestion = questionRepository.create({
            ...req.body,
            last_completion: last_completion,
            owner: user
        });



        const savedQuestion = await questionRepository.save(newQuestion);

        res.status(201).json(savedQuestion);
    });
    
}

