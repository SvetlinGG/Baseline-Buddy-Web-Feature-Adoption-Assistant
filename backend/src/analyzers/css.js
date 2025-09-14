const data = require("../data/baseline-map.json");

function analyzeCSS(code) {
  const results = [];
  if (code.includes(":has(")) {
    results.push({
      id: "css:selector:has",
      ...data["css:selector:has"],
      message: `⚠️ Found CSS :has() – Baseline: ${data["css:selector:has"].baseline}`
    });
  }
  return results;
}

module.exports = { analyzeCSS };
