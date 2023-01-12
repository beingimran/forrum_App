import mongoose from "mongoose";
const { Schema } = mongoose

const Category =new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    posts:{
        type:[String],
        require:true
    }
})



const Categorys = mongoose.model('Category',Category);
export default Categorys;