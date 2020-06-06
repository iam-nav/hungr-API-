const Mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const UserRegister = Mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'Enter Your name'],
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[7,'password must be at least 7 characters.'],
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
            throw new Error('Username must be at least 7 character')
        }
    }
 },
},{timestamps:true})



//login function
UserRegister.statics.findByCredentials = async (email,password)=>{
    const user =  await RegisterUsers.findOne({email:email})
    if(!user){
    throw ('Please enter a valid email address')
    }
   const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
    throw ('Please check your Credentials')
    }
    return user   
}


//hashing the password (it will hash the password before storing in db)
UserRegister.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


const  RegisterUsers  = Mongoose.model('RegisterUsers',UserRegister)



module.exports = RegisterUsers