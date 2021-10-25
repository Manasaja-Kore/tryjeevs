var express = require('express');
var router = express.Router();
const {v4 : uuidv4} = require('uuid');
let topicSchema = require('../models/topic');
let userSchema = require('../models/userprofile');
const sendErrorresponse = require('./error');




router.get('/:userId', async (req, res, next) => {
    let userId = req.params.userId;
    if(!userId){
      res.statusCode=400;
      res.send({"error":"missing mandatory parameters"});
    } else{ 
      try{
        let { skip, limit } = req.query;
        if(!skip){
          skip=0;
        }
        if(!limit){
          limit=2;
        }
        let topicData = await topicSchema.find({createdBy:userId}).limit(limit).skip(skip);
        res.send(topicData);
      }catch(err){
        sendErrorresponse(req,res);
      }
    }  
  });


router.post('/', async (req, res, next) => {
   let {title,createdBy} = req.body;
   let topic = new topicSchema();
   try{
        topic.Id = "tp-"+uuidv4();
        topic.createdBy = createdBy;
        topic.title = title;
        const data = await topic.save();
        console.log("data",data);
        res.statusCode = "201";
        res.send();
   }catch(err){
     sendErrorresponse(req,res);
}
});

module.exports = router;
