import * as vscode from 'vscode';
import { format } from 'sql-formatter';
import { createConfig } from './config';
import { SqlFormattingProvider } from './SqlFormattingProvider';
import { sqlDialects } from './sqlDialects';

export function activate(context: vscode.ExtensionContext) {
  // add SQL-Formatter-VSCode as a format provider for each SQL dialect
  Object.entries(sqlDialects).forEach(([vscodeLang, prettierLang]) =>
    context.subscriptions.push(
      vscode.languages.registerDocumentFormattingEditProvider(
        vscodeLang,
        new SqlFormattingProvider(prettierLang),
      ),
    ),
  );

  const formatSelectionCommand = vscode.commands.registerCommand(
    'sql-formatter-vscode.format-selection',
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const documentLanguage = editor.document.languageId ?? 'sql';
      const formatterLanguage = sqlDialects[documentLanguage] ?? 'sql';

      const extensionSettings = vscode.workspace.getConfiguration('SQL-Formatter-VSCode');

      const formatConfig = createConfig(
        extensionSettings,
        {
          // According to types, these editor.options properties can also be strings or undefined,
          // but according to docs, the string|undefined value is only applicable when setting,
          // so it should be safe to cast them.
          tabSize: editor.options.tabSize as number,
          insertSpaces: editor.options.insertSpaces as boolean,
        },
        formatterLanguage,
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
    },
  );

  context.subscriptions.push(formatSelectionCommand);
}

export function deactivate() {}
