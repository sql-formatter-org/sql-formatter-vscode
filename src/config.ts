import * as vscode from 'vscode';
import {
  SqlLanguage,
  KeywordCase,
  DataTypeCase,
  FunctionCase,
  IdentifierCase,
  IndentStyle,
  LogicalOperatorNewline,
  FormatOptionsWithLanguage,
  FormatOptions,
} from 'sql-formatter';
import { validateConfig } from 'sql-formatter/dist/cjs/validateConfig';

type ParamTypes = FormatOptions['paramTypes'];

export const createConfig = (
  extensionSettings: vscode.WorkspaceConfiguration,
  formattingOptions: vscode.FormattingOptions,
  detectedDialect: SqlLanguage,
): FormatOptionsWithLanguage => {
  const configuredDialect = extensionSettings.get<SqlLanguage | 'auto-detect'>('dialect');
  return {
    language: configuredDialect === 'auto-detect' ? detectedDialect : configuredDialect,
    ...createIndentationConfig(extensionSettings, formattingOptions),
    keywordCase: extensionSettings.get<KeywordCase>('keywordCase'),
    dataTypeCase: extensionSettings.get<DataTypeCase>('dataTypeCase'),
    functionCase: extensionSettings.get<FunctionCase>('functionCase'),
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

export const getConfigFromPath = async (
  configFilePath: string,
): Promise<FormatOptionsWithLanguage | undefined> => {
  try {
    const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(configFilePath));
    const configString = Buffer.from(fileContent).toString('utf8');
    const parsed = JSON.parse(configString);
    return validateConfig(parsed);
  } catch (error) {
    vscode.window.showErrorMessage(
      `Unable to read config file from path ${configFilePath}:\n${error}`,
    );
    return undefined;
  }
};
