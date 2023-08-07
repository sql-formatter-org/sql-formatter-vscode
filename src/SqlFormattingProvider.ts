import * as vscode from 'vscode';
import { SqlLanguage, format } from 'sql-formatter';
import { createConfig } from './config';

export class SqlFormattingProvider implements vscode.DocumentFormattingEditProvider {
  constructor(private language: SqlLanguage) {}

  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    formattingOptions: vscode.FormattingOptions,
  ): vscode.TextEdit[] {
    const extensionSettings = vscode.workspace.getConfiguration('SQL-Formatter-VSCode');
    const formatConfig = createConfig(extensionSettings, formattingOptions, this.language);

    // extract all lines from document
    const lines = [...new Array(document.lineCount)].map((_, i) => document.lineAt(i).text);
    let text;
    try {
      text = format(lines.join('\n'), formatConfig);
    } catch (e) {
      vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
      return [];
    }

    // replace document with formatted text
    return [
      vscode.TextEdit.replace(
        new vscode.Range(document.positionAt(0), document.lineAt(document.lineCount - 1).range.end),
        text + (extensionSettings.get('trailingNewline') ? '\n' : ''),
      ),
    ];
  }
}
