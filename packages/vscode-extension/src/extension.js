const vscode = require('vscode');

function activate(context) {
  console.log('✅ Baseline Buddy activated (sanity test)');

  const diags = vscode.languages.createDiagnosticCollection('baseline-buddy');
  context.subscriptions.push(diags);

  function setTestDiagnostic(doc) {
    if (!doc) return;
    console.log('👉 Opened:', doc.fileName, 'lang:', doc.languageId);
    if (doc.languageId !== 'html') return;

    const text = doc.getText();
    // Ако файлът съдържа <dialog>, слагаме 1 тестова диагноза
    const idx = text.indexOf('<dialog');
    const issues = [];
    if (idx >= 0) {
      const start = doc.positionAt(idx);
      const end = doc.positionAt(idx + '<dialog'.length);
      const d = new vscode.Diagnostic(
        new vscode.Range(start, end),
        'SANITY: Found <dialog> (test diagnostic)',
        vscode.DiagnosticSeverity.Warning
      );
      d.source = 'BaselineBuddy';
      issues.push(d);
    }
    diags.set(doc.uri, issues);
    console.log('👉 Diagnostics count:', issues.length);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(setTestDiagnostic),
    vscode.workspace.onDidChangeTextDocument(e => setTestDiagnostic(e.document))
  );

  if (vscode.window.activeTextEditor) setTestDiagnostic(vscode.window.activeTextEditor.document);
}

function deactivate() {}

module.exports = { activate, deactivate };

