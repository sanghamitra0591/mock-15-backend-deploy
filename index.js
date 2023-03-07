const express= require("express");
const { connection } = require("./configs/db");
const { validator } = require("./middlewares/validator.middleware");
const { userRouter } = require("./routes/user.route");

const app= express();

const cors= require("cors");

app.use(cors({
    origin : "*"
}))

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to Homepage");
})

app.use("/", userRouter);

app.use(validator);



app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect DB");
    }
    console.log(`Running at port ${process.env.port}`);
})