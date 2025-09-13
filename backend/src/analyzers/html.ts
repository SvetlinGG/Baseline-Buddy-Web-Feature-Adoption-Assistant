
import data from "../data/baseline-map.json";

export function analyzeHTML(code: string) {
  const results: any[] = [];
  if (code.includes("<dialog")) {
    results.push({
      id: "html:dialog",
      ...data["html:dialog"],
      message: `⚠️ Found <dialog> – Baseline: ${data["html:dialog"].baseline}`
    });
  }
  return results;
}
