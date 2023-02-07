const express = require("express");
const carModels = require("./cars-model");
const md = require("./cars-middleware");
const router = express.Router();

router.get("/", async(req,res,next) => {
    try{
        const cars = await carModels.getAll();
        res.json(cars);
    }catch(err){
        next(err)
    }
})

router.get("/:id", md.checkCarId, (req,res,next) => {
    try{
        res.json(req.car)
    }catch(err){
        next(err)
    }
})

router.post("/", md.checkCarPayload,md.checkVinNumberUnique,md.checkVinNumberValid, async(req,res,next) => {
    try{
        const car = await carModels.create(req.body);
        res.status(201).json(car)
    }catch(err){
        next(err)
    }
})

router.use((err,req,res,next) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router;