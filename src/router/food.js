const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Foods = require('../db/models/food')


router.post('/locationAndFood', auth,async (req,res)=>{ 
    const task = new Foods({
        location:{
            long:req.body.long,
            lat:req.body.lat,
            place:req.body.place
        },
        _id:req.user._id
        // owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/findlocation',auth,async(req,res)=>{
try{
const food = await Foods.findById(req.user._id)
if(!food){
    throw new Error()
}
res.status(201).send(food)
}catch(e){
    res.status(400).send(e)
}
})

module.exports = router
