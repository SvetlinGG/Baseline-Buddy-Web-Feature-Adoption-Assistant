
import express from "express";
import { analyzeCSS } from "./analyzers/css";
import { analyzeJS } from "./analyzers/js";
import { analyzeHTML } from "./analyzers/html";


const app = express();
app.use(express.json());

app.post("/analyze", (req, res) => {
    const { type, code } = req.body;
    let results: any[] = [];
  
    if (type === "css") results = analyzeCSS(code);
    if (type === "js") results = analyzeJS(code);
    if (type === "html") results = analyzeHTML(code);
  
    res.json({ results });
  });




app.listen(3001, () => {
    console.log("Baseline Buddy backend running oh http://localhost:3001");
    
});