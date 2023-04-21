const express = require("express");
const app = express()

app.listen(5000, ()=>{
    console.log("listening port 5000")
})

app.get("/",(req,res)=>{
    return res.json("hello world")
})