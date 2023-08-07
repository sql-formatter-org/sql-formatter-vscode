import * as vscode from 'vscode';
import { format } from 'sql-formatter';
import { createConfig } from './config';
import { sqlDialects } from './sqlDialects';

export function formatSelection() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const extensionSettings = vscode.workspace.getConfiguration('SQL-Formatter-VSCode');

  const formatConfig = createConfig(
    extensionSettings,
    editorFormattingOptions(editor),
    detectSqlDialect(editor),
  );

  try {
    // format and replace each selection
    editor.edit(editBuilder => {
      editor.selections.forEach(sel =>
        editBuilder.replace(sel, format(editor.document.getText(sel), formatConfig)),
      );
    });
  } catch (e) {
    vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
  }
}

const detectSqlDialect = (editor: vscode.TextEditor) =>
  sqlDialects[editor.document.languageId] ?? 'sql';

const editorFormattingOptions = (editor: vscode.TextEditor) => ({
  // According to types, these editor.options properties can also be strings or undefined,
  // but according to docs, the string|undefined value is only applicable when setting,
  // so it should be safe to cast them.
  tabSize: editor.options.tabSize as number,
  insertSpaces: editor.options.insertSpaces as boolean,
});
