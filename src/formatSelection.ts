import * as vscode from 'vscode';
import { createConfig, getConfigFromPath } from './config';
import { sqlDialects } from './sqlDialects';
import { formatEditorText } from './formatEditorText';

export async function formatSelection() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  try {
    const config = await createConfigForEditor(editor);
    replaceEachSelection(editor, text => formatEditorText(text, config));
  } catch (e) {
    vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
  }
}

function replaceEachSelection(editor: vscode.TextEditor, fn: (code: string) => string) {
  editor.edit(editBuilder => {
    editor.selections.forEach(sel => editBuilder.replace(sel, fn(editor.document.getText(sel))));
  });
}

const createConfigForEditor = async (editor: vscode.TextEditor) => {
  const extensionConfiguration = vscode.workspace.getConfiguration('SQL-Formatter-VSCode');
  const configFilePath = extensionConfiguration.get<string>('configFilePath');
  const configFromPath = configFilePath ? await getConfigFromPath(configFilePath) : undefined;
  const formattingOptions = editorFormattingOptions(editor);
  const detectedSqlDialect = detectSqlDialect(editor);
  return (
    configFromPath ?? createConfig(extensionConfiguration, formattingOptions, detectedSqlDialect)
  );
};

const detectSqlDialect = (editor: vscode.TextEditor) =>
  sqlDialects[editor.document.languageId] ?? 'sql';

const editorFormattingOptions = (editor: vscode.TextEditor) => ({
  // According to types, these editor.options properties can also be strings or undefined,
  // but according to docs, the string|undefined value is only applicable when setting,
  // so it should be safe to cast them.
  tabSize: editor.options.tabSize as number,
  insertSpaces: editor.options.insertSpaces as boolean,
});
