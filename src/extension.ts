import * as vscode from 'vscode';
import { SqlFormattingProvider } from './SqlFormattingProvider';
import { sqlDialects } from './sqlDialects';
import { formatSelection } from './formatSelection';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('sql-formatter-vscode.format-selection', formatSelection),

    ...registerFormattingProviderForEachDialect(),
  );
}

function registerFormattingProviderForEachDialect() {
  return Object.entries(sqlDialects).map(([vscodeLang, sqlDialectName]) =>
    vscode.languages.registerDocumentFormattingEditProvider(
      vscodeLang,
      new SqlFormattingProvider(sqlDialectName),
    ),
  );
}

export function deactivate() {}
