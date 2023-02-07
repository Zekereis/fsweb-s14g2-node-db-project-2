const db = require("../../data/db-config");
const cars = require("./cars-model")
const vinValidator = require("vin-validator")

const checkCarId = async (req, res, next) => {
  try{
    const car = await cars.getById(req.params.id);
    if(!car){
      next({
        status:404,
        message:`${req.params.id} kimliğine sahip araba bulunamadı`
      })
    }else{
      req.car = car;
      next();
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  try{
    if(!req.body.vin){
      next({
        status:400,
        message:"vin eksik"
      })
    }else if(!req.body.make){
      next({status:400,message:"make eksik"})
    }else if(!req.body.model){
      next({status:400,message:"model eksik"})
    }else if(!req.body.mileage){
      next({status:400,message:"mileage eksik"})
    }else{
      next();
    }
  }catch(err){
    next(err)
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValid = vinvValidator.validate(req.body.vin)
  if(isValid){
    next()
  }else{
    next({
      status:400,message: `vin ${req.body.vin} geçersizdir`
    })
  }
}

const checkVinNumberUnique = async(req, res, next) => {
  try{
    const car = await db("cars").where("vin",req.body.vin).first();
    if(car){
      next({
        status:400,message: `vin ${req.body.vin} zaten var`
      })
    }else{
      next();
    }
  }catch(err){
    next(err)
  }
}

module.exports = {checkCarId,checkCarPayload,checkVinNumberUnique,checkVinNumberValid};