const express = require("express");
const cors = require("cors");
const { analyzeCSS } = require("./analyzers/css");
const { analyzeJS } = require("./analyzers/js");
const { analyzeHTML } = require("./analyzers/html");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/analyze", (req, res) => {
  const { type, code } = req.body;
  let results = [];

  if (type === "css") results = analyzeCSS(code);
  if (type === "js") results = analyzeJS(code);
  if (type === "html") results = analyzeHTML(code);

  res.json({ results });
});

app.listen(3001, () => {
  console.log("✅ Baseline Buddy backend running on http://localhost:3001");
});
