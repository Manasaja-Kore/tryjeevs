const mongoose = require('mongoose');
const {Schema} = mongoose;
const postSchema = require("./post");

const topicSchema = new Schema({
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
        required: true,
        index:true
    }
});


const Topic = mongoose.model('topics', topicSchema);
module.exports = Topic;