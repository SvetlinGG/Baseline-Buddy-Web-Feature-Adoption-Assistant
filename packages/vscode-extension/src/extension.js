const vscode = require('vscode');
const { analyzeHTML, analyzeCSS, analyzeJS } = require('@baseline-buddy/core-analyzer');

function activate(context) {
  console.log('✅ Baseline Buddy activated (Analyzer)');
  const diags = vscode.languages.createDiagnosticCollection('baseline-buddy');
  context.subscriptions.push(diags);

  // --- severity state ---
  let currentSeverity = readSeverity();

  // слушай промени в настройките (Settings → search: baselineBuddy)
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration('baselineBuddy.severity')) {
        currentSeverity = readSeverity();
        // прегенерирай диагнози за отворения документ (по избор)
        const ed = vscode.window.activeTextEditor;
        if (ed) analyze(ed.document);
      }
    })
  );

  function readSeverity() {
    const cfg = vscode.workspace.getConfiguration('baselineBuddy');
    const level = (cfg.get('severity') || 'warning').toLowerCase();
    switch (level) {
      case 'error':   return vscode.DiagnosticSeverity.Error;
      case 'info':    return vscode.DiagnosticSeverity.Information;
      case 'warning':
      default:        return vscode.DiagnosticSeverity.Warning;
    }
  }

  function analyze(doc) {
    if (!doc) return;
    const lang = doc.languageId;
    if (!['html','css','javascript'].includes(lang)) return;

    const text = doc.getText();
    let results = [];
    if (lang === 'html') results = analyzeHTML(text);
    if (lang === 'css')  results = analyzeCSS(text);
    if (lang === 'javascript') results = analyzeJS(text);

    const issues = results.map(r => {
      const needle =
        r.id === 'html:dialog' ? '<dialog' :
        r.id === 'css:selector:has' ? ':has(' :
        r.id === 'js:view-transitions' ? 'startViewTransition' : '';
      const idx = needle ? text.indexOf(needle) : -1;

      const start = idx >= 0 ? doc.positionAt(idx) : new vscode.Position(0,0);
      const end   = idx >= 0 ? doc.positionAt(idx + Math.max(needle.length,1)) : new vscode.Position(0,1);

      const d = new vscode.Diagnostic(
        new vscode.Range(start, end),
        r.message,
        currentSeverity // 👈 използваме настройката
      );
      d.source = 'BaselineBuddy';
      d.code = { value: 'MDN Docs', target: vscode.Uri.parse(r.mdn) };
      return d;
    });

    diags.set(doc.uri, issues);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(analyze),
    vscode.workspace.onDidChangeTextDocument(e => analyze(e.document))
  );
  if (vscode.window.activeTextEditor) analyze(vscode.window.activeTextEditor.document);
}

function deactivate() {}

module.exports = { activate, deactivate };

