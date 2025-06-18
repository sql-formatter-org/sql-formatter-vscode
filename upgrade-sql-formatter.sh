#!/bin/bash
set -e

# 1. Update sql-formatter to latest version
yarn upgrade sql-formatter@latest

# 2. Get latest sql-formatter version
tmp_latest=$(yarn info sql-formatter version --silent)
latest_sql_formatter=$(echo "$tmp_latest" | tail -n1)

# 3. Bump patch version in package.json
yarn version --patch --no-git-tag-version
new_version=$(node -p "require('./package.json').version")

# 4. Update CHANGELOG.md
today=$(date +%Y-%m-%d)
changelog_entry="\
# CHANGELOG

## [$new_version] - $today

- Upgraded \`sql-formatter\` to v$latest_sql_formatter
"
# Remove the first line (the title) and prepend the new entry and the title
tmpfile=$(mktemp)
printf "%s" "$changelog_entry" > "$tmpfile"
tail -n +2 CHANGELOG.md >> "$tmpfile"
mv "$tmpfile" CHANGELOG.md

# 5. Commit and tag
git add package.json yarn.lock CHANGELOG.md
git commit -m "Version $new_version"
git tag "v$new_version"

# 6. Build the extension
yarn vsce:package

# 6. Push the changes to GitHub
git push origin master
git push origin "v$new_version"

echo ""
# Print the release message in bold green color
echo -e "\033[1;92mRelease $new_version complete.\033[0m"
echo ""
echo "Now go to VSCode marketplace: https://marketplace.visualstudio.com/manage/publishers/renesaarsoo"
echo "and select SQL Formatter VSCode -> Update"
