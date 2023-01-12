import { JwtPayload } from "jsonwebtoken";
import Posts from "../models/post";
import Users from "../models/user";
import checkAuth from "../utils/checkAuth";

export default {
    Mutation: {
        toggleLike: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);
            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const username = userPayload.username;
            const user = await Users.findOne({ username });
            const post = await Posts.findById(postId);
			// Post doesn't exist anymore
			if(!post)
                return { status: 404 };

            const uIndex = user.likes.indexOf(postId);
            const pIndex = post.likes.indexOf(username);

            // Update both user and post in database
            console.log(uIndex,pIndex);
            if(uIndex >= 0){
                // unlike
                user.likes.splice(uIndex, 1);
                post.likes.splice(pIndex, 1);
            }else {
                // like
                user.likes.push(postId);
                post.likes.push(username);
            }

            await user.save();
            await post.save();

            return { status: 204, like: !(uIndex >= 0) };
        }
    }
}