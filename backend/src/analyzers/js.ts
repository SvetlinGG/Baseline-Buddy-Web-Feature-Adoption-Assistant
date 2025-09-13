import data from "../data/baseline-map.json";

export function analyzeJS(code: string) {
  const results: any[] = [];
  if (code.includes("document.startViewTransition")) {
    results.push({
      id: "js:view-transitions",
      ...data["js:view-transitions"],
      message: `⚠️ Found View Transitions – Baseline: ${data["js:view-transitions"].baseline}`
    });
  }
  return results;
}
