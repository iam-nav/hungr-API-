const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Foods = require('../db/models/food')


router.post('/locationAndFood', auth,async (req,res)=>{
    const task = new Foods({
        ...req.body, //... spread opertor used
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch{
        res.status(400).send(e)
    }
})
module.exports = router
