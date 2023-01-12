import mongoose from "mongoose";
const {Schema} = mongoose;

const Reply = new Schema({
    username: {
        type:String,
        require:true
    },
    content: {
        type:String,
        require:true
    },
    replyAt: {
        type:String,
        require:true
    },
    postId: {
        type:String,
        require:true
    },
});

const Replies = mongoose.model('Reply',Reply)

export default Replies;