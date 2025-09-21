const baseline = require('./baseline-map.json');

function analyzeHTML(code='') {
  const results = [];
  if (code.includes('<dialog')) {
    const r = baseline['html:dialog'];
    results.push({ id:'html:dialog', ...r, message:`⚠️ Found <dialog> – Baseline: ${r.baseline}` });
  }
  return results;
}
function analyzeCSS(code='') {
  const results = [];
  if (code.includes(':has(')) {
    const r = baseline['css:selector:has'];
    results.push({ id:'css:selector:has', ...r, message:`⚠️ Found :has() – Baseline: ${r.baseline}` });
  }
  return results;
}
function analyzeJS(code='') {
  const results = [];
  if (code.includes('document.startViewTransition')) {
    const r = baseline['js:view-transitions'];
    results.push({ id:'js:view-transitions', ...r, message:`⚠️ Found View Transitions – Baseline: ${r.baseline}` });
  }
  return results;
}
module.exports = { analyzeHTML, analyzeCSS, analyzeJS };
