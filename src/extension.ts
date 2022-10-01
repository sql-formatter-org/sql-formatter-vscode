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
  formattingOptions: Partial<vscode.FormattingOptions>,
  language: SqlLanguage
): Partial<FormatOptions> => {
  return {
    language:
      language === 'sql' // override default SQL language mode if SQLFlavourOverride is set
        ? extensionSettings.get<SqlLanguage>('SQLFlavourOverride') ?? 'sql'
        : language,
    ...getIndentationConfig(extensionSettings, formattingOptions),
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

const getIndentationConfig = (
  extensionSettings: vscode.WorkspaceConfiguration,
  formattingOptions: Partial<vscode.FormattingOptions>
): Partial<FormatOptions> => {
  // override tab settings if ignoreTabSettings is true
  if (extensionSettings.get<boolean>('ignoreTabSettings')) {
    return {
      tabWidth: extensionSettings.get<number>('tabSizeOverride'),
      useTabs: !extensionSettings.get<boolean>('insertSpacesOverride'),
    };
  } else {
    return {
      tabWidth: formattingOptions.tabSize,
      useTabs: !formattingOptions.insertSpaces,
    };
  }
};

export function activate(context: vscode.ExtensionContext) {
  const formatProvider = (language: SqlLanguage) => ({
    provideDocumentFormattingEdits(
      document: vscode.TextDocument,
      formattingOptions: vscode.FormattingOptions
    ): vscode.TextEdit[] {
      const extensionSettings = vscode.workspace.getConfiguration('Prettier-SQL');
      const formatConfigs = getConfigs(extensionSettings, formattingOptions, language);

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
          text + (extensionSettings.get('trailingNewline') ? '\n' : '')
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
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const documentLanguage = editor.document.languageId ?? 'sql';
      const formatterLanguage = languages[documentLanguage] ?? 'sql';

      const extensionSettings = vscode.workspace.getConfiguration('Prettier-SQL');

      const formatConfigs = getConfigs(
        extensionSettings,
        {
          // According to types, these editor.options properties can also be strings,
          // but according to docs, the string value is only applicable when setting,
          // so it should be safe to cast them.
          tabSize: editor.options.tabSize as number,
          insertSpaces: editor.options.insertSpaces as boolean,
        },
        formatterLanguage
      );

      try {
        // format and replace each selection
        editor.edit(editBuilder => {
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
