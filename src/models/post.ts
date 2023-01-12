import mongoose from "mongoose";
import Categorys from "./category";
const { Schema } = mongoose

const Post = new Schema({
    title: {
        type:String,
        require:true
    },
    content: {
        type:String,
        require:true
    },
    username: {
        type:String,
        require:true
    },
    postAt: {
        type:String,
        require:true
    },
    lastActive: {
        type:String,
        require:true
    },
    likes: {
        type:[String],
        require:true
    },
    category:{
        type:String,
        require:true
    }

})
const Posts = mongoose.model('Post', Post)
export default Posts;
