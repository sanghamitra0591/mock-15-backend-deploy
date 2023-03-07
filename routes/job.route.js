const express= require("express");
const { JobModel } = require("../models/job.model");

const jobRouter= express.Router();


jobRouter.get("/user", async(req, res)=>{
    try {
        const data= await JobModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Unable to get job data")
    }
})


jobRouter.post("/add", async(req, res)=>{
    const data= req.body;
    try {
        const newData= new JobModel(data);
        await newData.save();
        res.send("Added new job");
    } catch (error) {
        console.log(error);
        res.send("Unable to add job data")
    }
})

jobRouter.patch("/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    try {
        await JobModel.findByIdAndUpdate({_id:id}, data);
        res.send("Updated job");
    } catch (error) {
        console.log(error);
        res.send("Unable to add job data")
    }
})

jobRouter.delete("/:id", async(req, res)=>{
    const id= req.params.id;
    try {
        await JobModel.findByIdAndDelete({_id:id});
        res.send("Deleted job");
    } catch (error) {
        console.log(error);
        res.send("Unable to add job data")
    }
})





module.exports= {
    jobRouter
}