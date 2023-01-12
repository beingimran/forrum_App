import Users from "../models/user";
import Posts from "../models/post";
import Replies from "../models/reply";
import checkAuth from "../utils/checkAuth";
import Categorys from "../models/category";

export default {
    Query: {
        // Return all posts in timeline.
        getPosts: async () => {
            return Posts.find().sort({ lastActive: -1 });
        },

        findPost: async (_, { postId }) => {
            return Posts.findById(postId);
        }
    },

    Mutation: {
        createPost: async (_, { postInput: { title, content, category } }, context:any) => {

            const userPayload = checkAuth(context);

            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const username = userPayload.username;
            const curTime = new Date().getTime();

            const post = new Posts({
                title,
                content,
                username,
                postAt: curTime,
                lastActive: curTime,
                likes: [],
                category
            });

            // Save the post in database
            await post.save();

            // Update the post in user's profile
            const user = await Users.findOne({ username });
            user.posts.push(post.id);
            await user.save();
            const categorys = await Categorys.findOne({title : category});
            categorys.posts.push(post.id);
            await categorys.save()

            return {
                status: 201,
                post
            };
        },

        deletePost: async (_, { postId }, context) => {
            const userPayload = checkAuth(context);

            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const user = await Users.findOne({ username: userPayload.username});
            const post = await Posts.findById(postId);
            const index = user.posts.indexOf(postId);

            // Post doesn't exist
            if(!post)
                return { status: 404 };

            // User doesn't have authority to access
            if(index<0)
                return { status: 403 };

            // Update the post in user profile
            user.posts.splice(index, 1);
            await user.save();

            // Remove the post from database
            await Posts.deleteOne({ _id: postId });

            // Remove all replies under the post from database
            await Replies.deleteMany({ postId });

            return { status: 204 };
        }
    }
}