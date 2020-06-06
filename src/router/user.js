const express = require('express')
const router = new express.Router()
const RegisterUsers = require('../db/models/users')

router.post('/Register',async (req,res)=>{
    const checkpassword = req.body
    const RegisterUser = new RegisterUsers(req.body)
    try{
    checkpassword.password!==checkpassword.confirmpassword?res.status(401).send('password and confirm password must be same'):
     await RegisterUser.save()
    res.status(201).send({RegisterUser})
    }catch (e){
    res.status(400).send(e)
    }
})

router.get('/login',async(req,res)=>{
    try{
        const user = await RegisterUsers.findByCredentials(req.body.email,req.body.password)
        // const token = await user.generateAuthToken()
        res.status(200).send(user)
    }catch(e){
        res.status(404).send(e+" error")

    }

})

module.exports = router