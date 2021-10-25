var express = require('express');
var router = express.Router();
const {v4 : uuidv4} = require('uuid')
let postSchema = require('../models/post');
let topicSchema = require('../models/topic');
let commentSchema = require('../models/comment');
const sendErrorresponse = require('./error'); 


async function getComments(posts){
  let arr = [];
  for(let i=0;i<posts.length;i++){
    let data = posts[i].toObject();
    data.comments = [];
    let comments = await commentSchema.find({postId:posts[i].Id}).exec();
    console.log("comments",comments);
    data.comments = comments;
    console.log(data);
    arr.push(data);
  }
return arr;
}

router.get('/', async (req, res, next) => {
  let topicId = req.query.topicId;
  if(!topicId){
    res.statusCode=400;
    res.send({"error":"missing mandatory parameters"});
  } else{ 
    try{
      let { skip, limit } = req.query;
      if(!skip){
        skip=0;
      }
      if(!limit){
        limit=10;
      }
      let postData = await postSchema.find({topicId:topicId}).limit(limit).skip(skip).exec();
      let finaldata = await getComments(postData);
      res.send(finaldata);
    }catch(err){
      console.log(err);
      sendErrorresponse(req,res);
    }
  }  
});


router.post('/', async (req, res, next) => {
   let {topicId,title,description} = req.body;
   let post = new postSchema();
   try{
        let topicData = await topicSchema.findOne({Id:topicId}).exec();
        console.log("topicData===>",topicData)
        post.Id = "pt-"+uuidv4();
        post.topicId = topicId;
        post.title = title;
        post.description = description;
        post.createdBy = topicData.createdBy;
        const data = await post.save();
        console.log("data",data);
        res.statusCode = "201";
        res.send();
   }catch(err){
      sendErrorresponse(req,res);
}
});

module.exports = router;
