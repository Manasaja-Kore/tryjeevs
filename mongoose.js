const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/users',
  {
    useNewUrlParser: true,
  },
  () =>{
    console.log("connected to db successfully");
  }
);

module.exports = mongoose;