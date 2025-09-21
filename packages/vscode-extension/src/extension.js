const vscode = require('vscode');
const { analyzeHTML, analyzeCSS, analyzeJS } = require('@baseline-buddy/core-analyzer');

function activate(context) {
  console.log('✅ Baseline Buddy activated (Analyzer)');
  const diags = vscode.languages.createDiagnosticCollection('baseline-buddy');
  context.subscriptions.push(diags);

  function analyze(doc) {
    if (!doc) return;
    const lang = doc.languageId;
    console.log('👉 Analyzing:', doc.fileName, 'lang:', lang);
    if (!['html','css','javascript'].includes(lang)) return;

    const text = doc.getText();
    let results = [];
    if (lang === 'html') results = analyzeHTML(text);
    if (lang === 'css') results = analyzeCSS(text);
    if (lang === 'javascript') results = analyzeJS(text);

    console.log('👉 Analyzer results:', results);

    const issues = results.map(r => {
      const needle =
        r.id === 'html:dialog' ? '<dialog' :
        r.id === 'css:selector:has' ? ':has(' :
        r.id === 'js:view-transitions' ? 'startViewTransition' : '';
      const idx = needle ? text.indexOf(needle) : -1;

      const start = idx >= 0 ? doc.positionAt(idx) : new vscode.Position(0, 0);
      const end   = idx >= 0 ? doc.positionAt(idx + needle.length) : new vscode.Position(0, 1);

      const d = new vscode.Diagnostic(
        new vscode.Range(start, end),
        r.message,
        vscode.DiagnosticSeverity.Warning
      );
      d.source = 'BaselineBuddy';
      d.code = { value: 'MDN Docs', target: vscode.Uri.parse(r.mdn) };
      return d;
    });

    diags.set(doc.uri, issues);
    console.log('👉 Diagnostics count:', issues.length);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(analyze),
    vscode.workspace.onDidChangeTextDocument(e => analyze(e.document))
  );

  if (vscode.window.activeTextEditor) analyze(vscode.window.activeTextEditor.document);
}

function deactivate() {}

module.exports = { activate, deactivate };

