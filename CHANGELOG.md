# CHANGELOG

## [4.0.1] - 2024-01-21

- Upgraded `sql-formatter` to v15.1.0

## [4.0.0] - 2023-12-10

- Upgraded `sql-formatter` to v15.0.2
- Added `dataTypeCase` config option.
- Added `functionCase` config option.

## [3.0.1] - 2023-11-22

- Removed `tabulateAlias` and `commaPosition` config options also from README.

## [3.0.0] - 2023-11-21

- Upgraded `sql-formatter` to v14.0.0
- Renamed the confusingly named `SQLFlavourOverride` configuration option to `dialect` and improved documentation.
- Removed `tabulateAlias` and `commaPosition` config options.
- Added `identiferCase` config option.
- Added `DB2i` dialect.

## [2.1.2] - 2023-10-31

- Upgraded `sql-formatter` to v13.0.3

## [2.1.1] - 2023-09-01

- Upgraded `sql-formatter` to v13.0.0

## [2.1.0] - 2023-08-12

- Auto-detect trailing newline when formatting a file or a selection.
  Dropping the old obscure `trailingNewline` config option.
- Fixed compatibility with VSCode Snowflake extension.

## [2.0.2] - 2023-08-03

- Upgraded `sql-formatter` to v12.2.4

## [2.0.1] - 2023-08-03

- Updated documentation

## [2.0.0] - 2023-08-03

- Renamed the extension from "Prettier SQL VSCode" to "SQL Formatter VSCode"
- Added `paramTypes` configuration option
- Upgraded `sql-formatter` to v12.2.0

## [1.6.0] - 2023-02-15

- added support for browser extension
- updated `sql-formatter` to v12.0.6

## [1.5.0] - 2022-11-18

- updated `sql-formatter` to v12.x

## [1.4.0] - 2022-10-05

- updated `sql-formatter` to v11.x
- added `snowflake` as new supported dialect

## [1.3.1] - 2022-09-07

- updated `sql-formatter` to v10.6.x

## [1.3.0] - 2022-09-05

- updated `sql-formatter` to v10.x
- updated to Nearley parser
- added `singlestoredb` as new supported dialect

## [1.2.0] - 2022-08-09

- updated `sql-formatter` to v9.x
- removed `aliasAS`
- added `trino` (aka presto) as new supported dialect

## [1.1.1] - 2022-07-05

- updated package metadata to point at `sql-formatter` instead of `prettier-sql`

## [1.1.0] - 2022-07-05

- updated `sql-formatter` to v8.x
- removed `newlineBeforeCloseParen`
- removed `newlineBeforeOpenParen`

## [1.0.0] - 2022-06-02

- switched from `prettier-sql` to `sql-formatter` as base library
- renamed `uppercaseKeywords` to `keywordCase`, changed from boolean to enum
- renamed `keywordPosition` to `indentStyle`
- renamed `breakBeforeBooleanOperator` to `logicalOperatorNewline`
- renamed `closeParenNewline` to `newlineBeforeCloseParen`
- renamed `openParenNewline` to `newlineBeforeOpenParen`
- renamed `lineWidth` to `expressionWidth`
- renamed `semicolonNewline` to `newlineBeforeSemicolon`
- added `'preserve'` option for `aliasAS`
- removed `keywordNewline`
- removed `itemCount`
- added formatProvider support on new languages:
  - sqlite

## [0.3.0] - 2022-04-09

- updated dependencies
- update build and publish flow
- renamed `keywordNewline` to `keywordNewline.newlineMode`, remove integer option
- restored deleted `itemCount` as `keywordNewline.itemCount`

## [0.2.0] - 2021-12-21

- added command `prettier-sql-vscode.format-selection`
  - Formats SQL selections
- added settings to override user/workspace `tabSize` and `insertSpaces` settings
- added error message on format fail
- added setting to override formatting language for `sql` files when SQL flavour does not have a VSCode language ID (Microsoft PostgreSQL and MSSQL Extensions)
- added formatProvider support on new languages:
  - bigquery

## [0.1.0] - 2021-11-23

- added wrapper for `prettier-sql`
- added VSCode settings for all configs present in v5 release
- added `prettier-sql` icon
- added formatProvider support on the following file languages:
  - sql
  - plsql
  - mysql
  - postgres
  - hive
