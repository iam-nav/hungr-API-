const express = require('express')
const app = express()
require('./src/db/mongodb')
const RouterUserRegister = require('./src/router/user')
const port = (3000)

app.use(express.json())
app.use(RouterUserRegister)

app.listen(port,()=>{
    console.log(`connected${port}`)
})