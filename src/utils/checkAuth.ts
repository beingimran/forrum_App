import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

export default (context: { req: { headers: { authorization: any; }; }; }) => {
    // context.req = { ... headers }
    const authHeader = context.req.headers.authorization;
    console.log(authHeader);
    if(authHeader){
        // Bearer ....
        const token = authHeader.replace('Bearer', '')
        if (token) {
            try {
                // userPayload
                return jwt.verify(token, SECRET_KEY) as JwtPayload;
            } catch (err) {
                // Invalid/Expired token
                return null;
            }
        }
    }

    return null;
}