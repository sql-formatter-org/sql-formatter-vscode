import * as vscode from 'vscode';
import {
  format,
  SqlLanguage,
  KeywordCase,
  IndentStyle,
  CommaPosition,
  LogicalOperatorNewline,
  FormatOptions,
} from 'sql-formatter';

const getConfigs = (
  extensionSettings: vscode.WorkspaceConfiguration,
  formattingOptions: vscode.FormattingOptions | { tabSize?: number; insertSpaces?: boolean },
  language: SqlLanguage
): Partial<FormatOptions> => {
  const ignoreTabSettings = extensionSettings.get<boolean>('ignoreTabSettings');
  const { tabSize, insertSpaces } = ignoreTabSettings // override tab settings if ignoreTabSettings is true
    ? {
        tabSize: extensionSettings.get<number>('tabSizeOverride'),
        insertSpaces: extensionSettings.get<boolean>('insertSpacesOverride'),
      }
    : formattingOptions;

  // build format configs from settings
  return {
    language:
      language === 'sql' // override default SQL language mode if SQLFlavourOverride is set
        ? extensionSettings.get<SqlLanguage>('SQLFlavourOverride') ?? 'sql'
        : language,
    tabWidth: tabSize,
    useTabs: !insertSpaces,
    keywordCase: extensionSettings.get<KeywordCase>('keywordCase'),
    indentStyle: extensionSettings.get<IndentStyle>('indentStyle'),
    logicalOperatorNewline: extensionSettings.get<LogicalOperatorNewline>('logicalOperatorNewline'),
    tabulateAlias: extensionSettings.get<boolean>('tabulateAlias'),
    commaPosition: extensionSettings.get<CommaPosition>('commaPosition'),
    expressionWidth: extensionSettings.get<number>('expressionWidth'),
    linesBetweenQueries: extensionSettings.get<number>('linesBetweenQueries'),
    denseOperators: extensionSettings.get<boolean>('denseOperators'),
    newlineBeforeSemicolon: extensionSettings.get<boolean>('newlineBeforeSemicolon'),
  };
};

export function activate(context: vscode.ExtensionContext) {
  const formatProvider = (language: SqlLanguage) => ({
    provideDocumentFormattingEdits(
      document: vscode.TextDocument,
      options: vscode.FormattingOptions
    ): vscode.TextEdit[] {
      const settings = vscode.workspace.getConfiguration('Prettier-SQL');
      const formatConfigs = getConfigs(settings, options, language);

      // extract all lines from document
      const lines = [...new Array(document.lineCount)].map((_, i) => document.lineAt(i).text);
      let text;
      try {
        text = format(lines.join('\n'), formatConfigs);
      } catch (e) {
        vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
        return [];
      }

      // replace document with formatted text
      return [
        vscode.TextEdit.replace(
          new vscode.Range(
            document.positionAt(0),
            document.lineAt(document.lineCount - 1).range.end
          ),
          text + (settings.get('trailingNewline') ? '\n' : '')
        ),
      ];
    },
  });

  const languages: { [lang: string]: SqlLanguage } = {
    'sql': 'sql',
    'plsql': 'plsql',
    'mysql': 'mysql',
    'postgres': 'postgresql',
    'hql': 'hive',
    'hive-sql': 'hive',
    'sql-bigquery': 'bigquery',
    'sqlite': 'sqlite',
  };
  // add Prettier-SQL as a format provider for each language
  Object.entries(languages).forEach(([vscodeLang, prettierLang]) =>
    context.subscriptions.push(
      vscode.languages.registerDocumentFormattingEditProvider(
        vscodeLang,
        formatProvider(prettierLang)
      )
    )
  );

  const formatSelectionCommand = vscode.commands.registerCommand(
    'prettier-sql-vscode.format-selection',
    () => {
      const documentLanguage = vscode.window.activeTextEditor?.document.languageId ?? 'sql';
      const formatterLanguage = languages[documentLanguage] ?? 'sql';

      const extensionSettings = vscode.workspace.getConfiguration('Prettier-SQL');

      // get tab settings from workspace
      const editorSettings = vscode.workspace.getConfiguration('editor');
      const tabOptions = {
        tabSize: editorSettings.get<number>('tabSize'),
        insertSpaces: editorSettings.get<boolean>('insertSpaces'),
      };

      const formatConfigs = getConfigs(extensionSettings, tabOptions, formatterLanguage);

      const editor = vscode.window.activeTextEditor;
      try {
        // format and replace each selection
        editor?.edit(editBuilder => {
          editor.selections.forEach(sel =>
            editBuilder.replace(sel, format(editor.document.getText(sel), formatConfigs))
          );
        });
      } catch (e) {
        vscode.window.showErrorMessage('Unable to format SQL:\n' + e);
      }
    }
  );

  context.subscriptions.push(formatSelectionCommand);
}

export function deactivate() {}
