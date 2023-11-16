import * as vscode from 'vscode';
import {
  SqlLanguage,
  KeywordCase,
  IdentifierCase,
  IndentStyle,
  LogicalOperatorNewline,
  FormatOptionsWithLanguage,
  FormatOptions,
} from 'sql-formatter';

type ParamTypes = FormatOptions['paramTypes'];

export const createConfig = (
  extensionSettings: vscode.WorkspaceConfiguration,
  formattingOptions: vscode.FormattingOptions,
  language: SqlLanguage,
): FormatOptionsWithLanguage => {
  return {
    language:
      language === 'sql' // override default SQL language mode if SQLFlavourOverride is set
        ? extensionSettings.get<SqlLanguage>('SQLFlavourOverride') ?? 'sql'
        : language,
    ...createIndentationConfig(extensionSettings, formattingOptions),
    keywordCase: extensionSettings.get<KeywordCase>('keywordCase'),
    identifierCase: extensionSettings.get<IdentifierCase>('identifierCase'),
    indentStyle: extensionSettings.get<IndentStyle>('indentStyle'),
    logicalOperatorNewline: extensionSettings.get<LogicalOperatorNewline>('logicalOperatorNewline'),
    expressionWidth: extensionSettings.get<number>('expressionWidth'),
    linesBetweenQueries: extensionSettings.get<number>('linesBetweenQueries'),
    denseOperators: extensionSettings.get<boolean>('denseOperators'),
    newlineBeforeSemicolon: extensionSettings.get<boolean>('newlineBeforeSemicolon'),
    paramTypes: extensionSettings.get<ParamTypes>('paramTypes'),
  };
};

const createIndentationConfig = (
  extensionSettings: vscode.WorkspaceConfiguration,
  formattingOptions: vscode.FormattingOptions,
): FormatOptionsWithLanguage => {
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
