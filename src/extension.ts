import * as vscode from 'vscode';
import { SqlFormattingProvider } from './SqlFormattingProvider';
import { sqlDialects } from './sqlDialects';
import { formatSelection } from './formatSelection';

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

  context.subscriptions.push(
    vscode.commands.registerCommand('sql-formatter-vscode.format-selection', formatSelection),
  );
}

export function deactivate() {}
