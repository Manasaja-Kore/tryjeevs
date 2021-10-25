const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    topicId:{
        type: String,
        required: true,
        index: true  
    },
    Id:{
        type: String,
        unique : true,
        required: true,
        index: true  
    },
    title: {
        type: String,
        required: true
    },  
    createdon:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type: String,
        required: true
    },
    description:{
        type: String,
    }
});


const Post = mongoose.model('posts', postSchema);
module.exports = Post;