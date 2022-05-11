// const mongoose = require('mongoose')
import mongoose from 'mongoose'

// const Task = require('./task')
import validator  from 'validator'
import bcrypt  from 'bcrypt'
import jwt  from 'jsonwebtoken'
import Task  from'./task.js'
// import { schema }  from'./task.js'


const Schema = new mongoose.Schema({
    Firstname:{
        type:String,
        required:[true, 'Firstname is required']
    },
    Lastname:{
        type:String,
        required:[true, 'Lastname is required']
    },
    Email: {
        type: String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is required')
            } 
        }
    },
    Number:{
        type:Number,
        unique:true,
        maxlength:10,
        required:[true, 'number is required']
    },
    Password:{
        type:String,
        required:true,
        minLength:6,
        trim:true,
        validate(value) {
            if(value.toLowerCase().includes('Password')){
                throw new Error("Password should not contain 'Password'!!!")
            }
        }
    },
    // admin:{
    //     type:Boolean
    // },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{timestamps:true})

Schema.virtual("tasks",{
    ref : "task",
    localField:'_id',
    foreignField:'owner'
})

Schema.pre('remove', async function (next){
    const user =  this
    await Task.deleteMany({owner: user._id})
    next()
})
Schema.pre("save" , async function (next){
    const user = this 
    if(user.isModified("Password")){
        console.log(user);
        const hash = await bcrypt.hash(user.Password, 10)
        user.Password = hash
    }
    next()
})
Schema.methods.generateToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id},"Tejas")
    console.log(token);
    user.tokens.push({token})
    await user.save()
    return token
}

Schema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.Password
    delete userObject.tokens
    // delete userObject.Password
    // delete userObject.Password
    return userObject
}
Schema.statics.login = async(Email,Password) =>{
    const user = await User.findOne({Email})
    console.log(Email,Password)
    console.log(user)
    if(!user){
        throw new Error('mail is invalid')
    }
    const result = await bcrypt.compare(Password,user.Password)
    if(!result){
        throw new Error('Password is invalid')
    }
    return user
}


const User = mongoose.model('user', Schema)
export default User;