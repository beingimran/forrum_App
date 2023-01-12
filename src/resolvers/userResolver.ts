import bcrypt from 'bcrypt';
import Users from '../models/user';
import 'dotenv/config';
import generateToken from '../utils/generateToken';

export default {
    Mutation: {
        login: async (_, { userInput: { username, password }}) => {
            const user = await Users.findOne({ username });

            // Unauthenticated
            const failedResponse = { status: 401 };

            // In case username doesn't exist in database
            if(!user)
                return failedResponse;

            const match = bcrypt.compare(password, user.password);
            // In case password doesn't match with information in database
            if(!match)
                return failedResponse;

            // Generate token and return user information
            const token = generateToken(user);

            return {
                // Success
                status: 200,
                user: {
                    id: user._id,
                    token,
                    username: user.username
            
                }
            }
        },

        register: async (_, { userInput: { username, password }}) => {
            // Username already in database, conflict
            try{if(await Users.findOne({ username }))
                return { status: 409 };

            // Only save hashed password for security.
            password = await bcrypt.hash(password, 10);
            const user = new Users({
                username,
                password,
                posts: [],
                likes: []
            });
            // Save the user in database
            await user.save();

            // Generate token and return user information
            const token = generateToken(user);

            return {
                // Created
                status: 201,
                user: {
                    id: user._id,
                    token,
                username:user.username}
            };}catch(e){
                console.log(e)
            }
        }
    }
}