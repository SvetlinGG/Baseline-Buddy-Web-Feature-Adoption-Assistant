const vscode = require('vscode');
const { analyzeHTML, analyzeCSS, analyzeJS } = require('@baseline-buddy/core-analyzer');

function activate(context) {
  const diagnostics = vscode.languages.createDiagnosticCollection('baseline-buddy');
  context.subscriptions.push(diagnostics);
  
  function analyzeDocument(doc) {
    if (!['html','css','javascript'].includes(doc.languageId)) return;

    const text = doc.getText();
    console.log("👉 LanguageId:", doc.languageId);
    let results = [];
    if (doc.languageId === 'html') results = analyzeHTML(text);
    // if (doc.languageId === 'css') results = analyzeCSS(text);
    // if (doc.languageId === 'javascript') results = analyzeJS(text);

    const issues = results.map(r => {
      const idx = text.indexOf(r.title.includes('dialog') ? '<dialog' :
                              r.title.includes(':has') ? ':has(' :
                              'startViewTransition');
      const start = idx >= 0 ? doc.positionAt(idx) : new vscode.Position(0,0);
      const end = idx >= 0 ? doc.positionAt(idx + 5) : new vscode.Position(0,5);
      const d = new vscode.Diagnostic(new vscode.Range(start,end), r.message, vscode.DiagnosticSeverity.Warning);
      d.source = 'BaselineBuddy';
      d.code = { value: 'baseline', target: vscode.Uri.parse(r.mdn) }; // линк към MDN
      return d;
    });

    diagnostics.set(doc.uri, issues);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(analyzeDocument),
    vscode.workspace.onDidChangeTextDocument(e => analyzeDocument(e.document))
  );

  if (vscode.window.activeTextEditor) analyzeDocument(vscode.window.activeTextEditor.document);

  context.subscriptions.push(
    vscode.commands.registerCommand('baselineBuddy.openDocs', (url) => {
      vscode.env.openExternal(vscode.Uri.parse(url));
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
