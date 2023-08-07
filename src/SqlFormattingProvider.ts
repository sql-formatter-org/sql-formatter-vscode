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

    try {
      // replace document with formatted text
      return [
        vscode.TextEdit.replace(
          new vscode.Range(
            document.positionAt(0),
            document.lineAt(document.lineCount - 1).range.end,
          ),
          format(this.getAllText(document), formatConfig) +
            (extensionSettings.get('trailingNewline') ? '\n' : ''),
        ),
      ];
    } catch (e) {
      vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
      return [];
    }
  }

  private getAllText(document: vscode.TextDocument) {
    // extract all lines from document
    return [...new Array(document.lineCount)].map((_, i) => document.lineAt(i).text).join('\n');
  }
}
