const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const RegisterUsers = require('../db/models/users')

router.post('/register',async (req,res)=>{
    const checkpassword = req.body
    const RegisterUser = new RegisterUsers(req.body)
    try{
    // checkpassword.password!==checkpassword.confirmpassword?res.status(400).send('password and confirm password must be same'):
     await RegisterUser.save()
     const token = await RegisterUser.generateAuthToken()
    res.status(201).send({RegisterUser,token})
    }catch (e){
    res.status(422).send(e+"error")
    }
})

router.post('/login',async(req,res)=>{
    try{
        const user = await RegisterUsers.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken(user._id)
        res.status(200).send({token})
    }catch(e){
        res.status(422).send(e+" error")
    }
})


router.get('/users/me',auth,(req,res)=>{
    res.send(req.user)
})

module.exports = router