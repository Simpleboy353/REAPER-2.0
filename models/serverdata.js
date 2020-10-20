const mongoose = require("mongoose")

const dataScheama2 = mongoose.Schema({
    gid:String,
      gname:String,
    gprefix:String
})
module.exports = mongoose.model("ServerData",dataScheama2)
