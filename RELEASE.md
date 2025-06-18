## Release process

### Full manual release

- Bump the version number
- Add entry to changelog
- Commit and tag the version
- run `yarn vsce:package`
- Go to [VSCode marketplace](https://marketplace.visualstudio.com/manage/publishers/renesaarsoo)
- Select SQL Formatter VSCode -> Update

### Quick release

When you just want to upgrade sql-formatter to the latest version, run:

```bash
yarn upgrade-sql-formatter
```
