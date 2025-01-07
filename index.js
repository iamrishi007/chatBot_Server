const express = require('express')
const moongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connection = require("./Config/db")
const app = express()
const userRouter = require("./Routes/user.route")
const PORT = process.env.PORT
app.use(express.json())

app.get("/home", (req, res) => {
     res.send("Boat Get Request to server")
})

app.use("/user", userRouter);

app.listen(PORT, async () => {
     try {
          await connection
          console.log("server is connected with mongoDB");

     } catch (error) {
          console.log("server is not connect");

     }

})