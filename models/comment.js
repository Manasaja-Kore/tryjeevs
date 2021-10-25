const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    Id:{
        type: String,
        unique : true,
        required: true,
        index:true  
    },
    comment: {
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
    postId:{
        type: String,
        required: true,
        index:true   
    }    
});


const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;