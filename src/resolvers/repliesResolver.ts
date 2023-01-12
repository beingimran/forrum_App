import Posts from "../models/post";
import Replies from "../models/reply";
import checkAuth from "../utils/checkAuth";

export default {
    Query: {
        getReplies: async (_, { postId }) => {
            return Replies.find({ postId }).sort({ replyAt: -1 });
        }
    },

    Mutation: {
        reply: async (_, { postId, content }, context) => {
            const userPayload = checkAuth(context);

            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const post = await Posts.findById(postId);
            // Post doesn't exist
            if(!post)
                return { status: 404 };

            // Save reply in database
            const reply = new Replies({
                username: userPayload.username,
                content,
                replyAt: new Date().getTime(),
                postId
            });
            await reply.save();

            // Update post in database
            post.lastActive = new Date().getTime().toString();
            await post.save();

            return {
                status: 201,
                reply
            };
        },

        deleteReply: async (_, { replyId }, context) => {
            const userPayload = checkAuth(context);
            // User didn't log in / token expired
            if(!userPayload)
                return { status: 401 };

            const username = userPayload.username;
            const reply = await Replies.findOne({ _id: replyId });
            // Reply doesn't exist
            if(!reply)
                return { status: 404 };

            // User doesn't have authority to access
            if(reply.username !== username)
                return { status: 403 };

            // Remove reply from database
            await Replies.deleteOne({ _id: replyId });

            return { status: 204 };
        }
    }
}