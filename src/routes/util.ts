import jwt from 'jsonwebtoken';
import { Request } from 'express';

export function getEmailFromToken(req: Request, secret: string): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            const decodedToken: any = jwt.verify(token, secret);
            return decodedToken.email;
        } catch (err) {
            console.log("Invalid token", err);
        }
    }
    return null;
}