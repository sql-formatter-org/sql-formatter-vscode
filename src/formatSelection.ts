import * as vscode from 'vscode';
import { createConfig } from './config';
import { sqlDialects } from './sqlDialects';
import { formatEditorText } from './formatEditorText';

export function formatSelection() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  try {
    replaceEachSelection(editor, text => formatEditorText(text, createConfigForEditor(editor)));
  } catch (e) {
    vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
  }
}

function replaceEachSelection(editor: vscode.TextEditor, fn: (code: string) => string) {
  editor.edit(editBuilder => {
    editor.selections.forEach(sel => editBuilder.replace(sel, fn(editor.document.getText(sel))));
  });
}

const createConfigForEditor = (editor: vscode.TextEditor) =>
  createConfig(
    vscode.workspace.getConfiguration('SQL-Formatter-VSCode'),
    editorFormattingOptions(editor),
    detectSqlDialect(editor),
  );

const detectSqlDialect = (editor: vscode.TextEditor) =>
  sqlDialects[editor.document.languageId] ?? 'sql';

const editorFormattingOptions = (editor: vscode.TextEditor) => ({
  // According to types, these editor.options properties can also be strings or undefined,
  // but according to docs, the string|undefined value is only applicable when setting,
  // so it should be safe to cast them.
  tabSize: editor.options.tabSize as number,
  insertSpaces: editor.options.insertSpaces as boolean,
});
