import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY;

export default (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '7d' }
    );
};