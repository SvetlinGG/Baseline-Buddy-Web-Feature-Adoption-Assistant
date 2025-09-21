const express = require("express");
const cors = require("cors");
const { analyzeHTML, analyzeCSS, analyzeJS } = require('../../packages/core-analyzer');


const app = express();
app.use(express.json());
app.use(cors());

app.post("/analyze", (req, res) => {
  const { type, code } = req.body;
  console.log("👉 type:", type, "code:", code);

  let results = [];
  if (type === "html") results = analyzeHTML(code);
  if (type === "css") results = analyzeCSS(code);
  if (type === "js") results = analyzeJS(code);

  res.json({ results });
});

app.listen(3001, () => {
  console.log("✅ Baseline Buddy backend running on http://localhost:3001");
});

