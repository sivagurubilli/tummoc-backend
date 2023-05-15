const express = require("express")
const User = require("../models/user.model")

const router = express.Router()

router.get("/",async(req,res)=>{
    try {
        const user = await User.find().lean().exec()

        const matchCities = await User.aggregate(
            [{$match :{city:"mumbai"}}]
        );

        res.status(200).send({user,matchCities})
    } catch (err) {
        return res.status(500).send({message:err.message})
    }
})

router.post("/",async(req,res)=>{
    try {
        const user = await User.create(req.body)
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({message:err.message})
    }
})

module.exports = router