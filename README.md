<a href='https://github.com/sql-formatter-org/sql-formatter'><img src="https://raw.githubusercontent.com/sql-formatter-org/sql-formatter-vscode/master/sql-formatter-icon.png" width="128"/></a>

# SQL Formatter VSCode [![version number](https://img.shields.io/visual-studio-marketplace/v/ReneSaarsoo.sql-formatter-vsc?label=vscode)](https://marketplace.visualstudio.com/items?itemName=ReneSaarsoo.prettier-sql-vsc)

Formats SQL files using the [`sql-formatter`](https://github.com/sql-formatter-org/sql-formatter) library

Supports the following SQL Dialects:

- Standard SQL
- BigQuery
- DB2
- Hive
- MariaDB
- MySQL
- N1QL
- PL/SQL
- PostgresQL
- Amazon Redshift
- SingleStoreDB
- Snowflake
- Spark
- SQLite
- Trino (Presto)
- TransactSQL

## Issues

Please report issues here: https://github.com/sql-formatter-org/sql-formatter/issues

Use the FORMATTING template if it is an issue related the formatting of the SQL, otherwise, please use the VSCODE template for issues with running the VSCode Extension

## Configuration

`SQL-Formatter-VSCode.SQLFlavourOverride`: Uses custom SQL Flavour to format `sql` files. Use this if you are using the Microsoft PostgreSQL or MSSQL Extensions since they do not provide a new language ID for VSCode.

`SQL-Formatter-VSCode.ignoreTabSettings`: Whether to ignore VSCode user/workspace settings for `tabSize` and `insertSpaces`

`SQL-Formatter-VSCode.tabSizeOverride`: Overrides `tabSize` if `SQL-Formatter-VSCode.ignoreTabSettings` is enabled

`SQL-Formatter-VSCode.insertSpacesOverride`: Overrides `insertSpaces` if `SQL-Formatter-VSCode.ignoreTabSettings` is enabled

`SQL-Formatter-VSCode.keywordCase`: Whether to print keywords in ALL CAPS or lowercase

`SQL-Formatter-VSCode.indentStyle`: Switched between standard keyword positioning vs maintaining a central space column

`SQL-Formatter-VSCode.logicalOperatorNewline`: Whether to break before or after AND and OR

`SQL-Formatter-VSCode.tabulateAlias`: Whether to right-align aliases to the longest line in the SELECT clause

`SQL-Formatter-VSCode.commaPosition`: Where to place commas for SELECT and GROUP BY clauses

`SQL-Formatter-VSCode.expressionWidth`: Number of characters allowed in each line before breaking

`SQL-Formatter-VSCode.linesBetweenQueries`: How many newlines to place between each query / statement

`SQL-Formatter-VSCode.denseOperators`: Whether to strip whitespace around operators such as + or >=

`SQL-Formatter-VSCode.newlineBeforeSemicolon`: Whether to place semicolon on its own line or on previous line

`SQL-Formatter-VSCode.trailingNewline`: Whether to ensure there is a trailing newline at the end of the file

`SQL-Formatter-VSCode.paramTypes`: Specifies parameter placeholders types to support
