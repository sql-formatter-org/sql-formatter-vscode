<a href='https://github.com/sql-formatter-org/sql-formatter'><img src="https://raw.githubusercontent.com/sql-formatter-org/sql-formatter-vscode/master/sql-formatter-icon.png" width="128"/></a>

# SQL Formatter VSCode [![version number](https://img.shields.io/visual-studio-marketplace/v/ReneSaarsoo.sql-formatter-vsc?label=vscode)](https://marketplace.visualstudio.com/items?itemName=ReneSaarsoo.prettier-sql-vsc)

Formats SQL files using the [sql-formatter][] library.

**Note:** _This extension is a direct successor of **Prettier SQL VSCode** extension, which is no more maintained._

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

## Configuration

- `SQLFlavourOverride`: Uses custom SQL Flavour to format `sql` files. Use this if you are using the Microsoft PostgreSQL or MSSQL Extensions since they do not provide a new language ID for VSCode.

- `ignoreTabSettings`: Whether to ignore VSCode user/workspace settings for `tabSize` and `insertSpaces`

- `tabSizeOverride`: Overrides `tabSize` if `ignoreTabSettings` is enabled

- `insertSpacesOverride`: Overrides `insertSpaces` if `ignoreTabSettings` is enabled

- `keywordCase`: Whether to print keywords in ALL CAPS or lowercase

- `indentStyle`: Switched between standard keyword positioning vs maintaining a central space column

- `logicalOperatorNewline`: Whether to break before or after AND and OR

- `tabulateAlias`: Whether to right-align aliases to the longest line in the SELECT clause

- `commaPosition`: Where to place commas for SELECT and GROUP BY clauses

- `expressionWidth`: Number of characters allowed in each line before breaking

- `linesBetweenQueries`: How many newlines to place between each query / statement

- `denseOperators`: Whether to strip whitespace around operators such as + or >=

- `newlineBeforeSemicolon`: Whether to place semicolon on its own line or on previous line

- `paramTypes`: Specifies parameter placeholders types to support

## Having a problem?

Please report issues to [SQL Formatter library Github page][issues].

This extension and the sql-formatter libary share the same issue tracker,
as the authors of both are the same and the bugs reported about the VSCode
extension are really mostly bugs in the underlying formatter library.

Don't worry about this difference though when reporting problems.
But do [read the FAQ][faq] before filing your report.

## Release process

- Bump the version number
- Add entry to changelog
- Commit and tag the version
- run `yarn vsce:package`
- Go to [VSCode marketplace](https://marketplace.visualstudio.com/manage/publishers/renesaarsoo)
- Select SQL Formatter VSCode -> Update

[sql-formatter]: https://github.com/sql-formatter-org/sql-formatter
[issues]: https://github.com/sql-formatter-org/sql-formatter/issues
[faq]: https://github.com/sql-formatter-org/sql-formatter#frequently-asked-questions
