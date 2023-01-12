import mongoose from "mongoose";
const {Schema} = mongoose;

const User = new Schema({
    username: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    posts: {
        type:[String],
        require:true
    },
    likes: {
        type:[String],
        require:true
    },
});

const Users = mongoose.model('User', User);
export default Users
