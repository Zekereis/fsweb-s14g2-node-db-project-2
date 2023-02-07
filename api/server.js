const express = require("express")

const server = express()

server.use(express.json())

const carsRouter = require("./cars/cars-router")

server.use("api/cars",carsRouter)

server.use("*", (req,res) => {
    res.status(404).json({
        message: "Not Found"
    })
})


module.exports = server
