import express from "express"
import listapi from "./routes/list_api.js"
import seedapi from "./routes/seed_api.js"
import resetapi from "./routes/reset_api.js"
import dbConnect from './db.js';

// Creating express server
const app=express();
dbConnect();

const PORT = process.env.PORT || 3000

// Handling routes request
app.use("/list",listapi)
app.use("/seed",seedapi)
app.use("/reset",resetapi)
app.listen(PORT,()=>{
	console.log("Server is Running")
})
