const express = require("express");
const configDB = require("./config/configDB");
const authRouter = require("./routes/authRoute")
const app = express()
require("dotenv").config({path:"./config/.env"})
configDB()
app.use(express.json())
app.use("/auth",authRouter)


const PORT = 5000;
app.listen(PORT,err => err ? console.error(err) : console.log(`Server is running on port ${PORT}`))