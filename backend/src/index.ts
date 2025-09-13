
import express from "express";


const app = express();
app.use(express.json());




app.listen(3001, () => {
    console.log("Baseline Buddy backend running oh http://localhost:3001");
    
});