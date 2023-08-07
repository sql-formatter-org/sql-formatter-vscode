import * as path from 'path';
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('SQL Formatter VSCode', () => {
  test('formats SQL file', async () => {
    const uri = vscode.Uri.file(path.join(__dirname + '/../../../test-data/example.sql'));
    const document = await vscode.workspace.openTextDocument(uri);
    await vscode.window.showTextDocument(document);
    assert.equal(
      'SELECT * FROM my_table WHERE age > 10 AND salary BETWEEN 1000 AND 2000;\n',
      document.getText(),
    );
    await vscode.commands.executeCommand('editor.action.formatDocument');
    assert.equal(
      `SELECT
    *
FROM
    my_table
WHERE
    age > 10
    AND salary BETWEEN 1000 AND 2000;`,
      document.getText(),
    );
  });
});
