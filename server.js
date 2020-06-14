const express = require('express')
const app = express()
var cors = require('cors')
require('./src/db/mongodb')
const RouterUserRegister = require('./src/router/user')
const food = require('./src/router/food')

const port =  8080

app.use(express.json())
app.use(cors()) 

app.use(RouterUserRegister)
app.use(food)

app.listen(port,()=>{
    console.log(`connected${port}`)
})