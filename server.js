const express = require('express')
const cors = require('cors')
const app = express()
require('./src/db/mongodb')
const RouterUserRegister = require('./src/router/user')
const food = require('./src/router/food')
const port =  process.env.PORT


app.use(cors())

app.use(express.json())
app.use(RouterUserRegister)
app.use(food)

app.listen(port,()=>{
    console.log(`connected${port}`)
})