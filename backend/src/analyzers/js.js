const data = require("../data/baseline-map.json");

function analyzeJS(code) {
  const results = [];
  if (code.includes("document.startViewTransition")) {
    results.push({
      id: "js:view-transitions",
      ...data["js:view-transitions"],
      message: `⚠️ Found View Transitions – Baseline: ${data["js:view-transitions"].baseline}`
    });
  }
  return results;
}

module.exports = { analyzeJS };

