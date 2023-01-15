import {gql} from 'apollo-server';
export default gql`
interface ResponseWithStatus{
        status: ID!
    }

    type Reply{
        id: ID!
        username: String!
        content: String!
        replyAt: String!
        postId: String!
    }
    type Post{
        id: ID!
        title: String!
        content: String!
        username: String!
        postAt: String!
        lastActive: String!
        "Array of username"
        likes: [String]
        category:String
    }
    
    type Query{
        getPosts: [Post]!
        findPost(postId: String): Post
        getReplies(postId: String): [Reply]!
    }
    
    type PostResponse implements ResponseWithStatus{
        status: ID!
        post: Post
    }
    type ReplyResponse implements ResponseWithStatus{
        status: ID!
        reply: Reply
    }
    
    type LikeResponse implements ResponseWithStatus{
        status: ID!
        like: Boolean
    }
    "Can't use interface directly"
    type SimplifiedResponse implements ResponseWithStatus{
        status: ID!
    }

    input PostInput{
        title: String!
        content: String!
        category:String!
    }
    type Mutation{
        createPost(postInput: PostInput!): PostResponse!
        "Also remove the post from user profile"
        deletePost(postId: String!): SimplifiedResponse!
        reply(postId: String!, content: String!): ReplyResponse!
        "Also remove the reply from user profile"
        deleteReply(replyId: String!): SimplifiedResponse!
        toggleLike(postId: String!): LikeResponse!
    }

`;