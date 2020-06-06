const Mongoose = require('mongoose')
const FoodLocation = Mongoose.Schema({
    location:{
        type:String,
        required:true,
        trim:true
    },
    food:{
        type:Boolean,
        default:false
    },
    owner:{
        type:Mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    }
},{timestamps:true})

const Foods = Mongoose.model('Foods',FoodLocation)


module.exports = Foods