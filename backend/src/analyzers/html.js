
const data = require("../data/baseline-map.json");

function analyzeHTML(code) {
  const results = [];
  if (code.includes("<dialog")) {
    results.push({
      id: "html:dialog",
      ...data["html:dialog"],
      message: `⚠️ Found <dialog> – Baseline: ${data["html:dialog"].baseline}`
    });
  }
  return results;
}

module.exports = { analyzeHTML };
