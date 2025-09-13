import data from "../data/baseline-map.json";

export function analyzeCSS(code: string){
    const results: any[] = [];
    if (code.includes(":has(")){
        results.push({
            id: "css:selector:has",
            ...data["css:selector:has"],
            message: `⚠️ Found CSS :has() – Baseline: ${data["css:selector:has"].baseline}`
        });
    }
    return results;
}