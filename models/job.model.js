const mongoose= require("mongoose");

const jobSchema= mongoose.Schema({
    company: String,
    position: String,
    contract: String,
    location : String
})

const JobModel= mongoose.model("job", jobSchema);

module.exports= {
    JobModel
}