function sendErrorresponse(req,res){
    res.statusCode = "400";
    res.json({"message":"Bad Request"});
}

module.exports = sendErrorresponse;