import * as path from 'path';
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('SQL Formatter VSCode', () => {
  test('formats SQL file', async () => {
    const { document } = await loadFile('example.sql');
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
    AND salary BETWEEN 1000 AND 2000;
`,
      document.getText(),
    );
    await cleanup();
  });

  test('formats SQL file without trailing newline', async () => {
    const { document } = await loadFile('example-no-newline.sql');
    assert.equal(
      'SELECT * FROM my_table WHERE age > 10 AND salary BETWEEN 1000 AND 2000;',
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
    await cleanup();
  });

  test('formats selection', async () => {
    const editor = await loadFile('selection.sql');

    editor.selection = new vscode.Selection(2, 0, 2, 18);
    await sleep(120);

    await vscode.commands.executeCommand('sql-formatter-vscode.format-selection');

    await sleep(120);
    assert.equal(
      `SELECT * FROM foo;

SELECT
    *
FROM
    bar;

SELECT * FROM zap;
`,
      editor.document.getText(),
    );
    await cleanup();
  });

  test('formats selection including trailing newline', async () => {
    const editor = await loadFile('selection.sql');

    editor.selection = new vscode.Selection(2, 0, 3, 0);
    await sleep(120);

    await vscode.commands.executeCommand('sql-formatter-vscode.format-selection');

    await sleep(120);
    assert.equal(
      `SELECT * FROM foo;

SELECT
    *
FROM
    bar;

SELECT * FROM zap;
`,
      editor.document.getText(),
    );
    await cleanup();
  });
});

async function loadFile(fileName: string): Promise<vscode.TextEditor> {
  const uri = vscode.Uri.file(path.join(__dirname + '/../../../test-data/' + fileName));
  const document = await vscode.workspace.openTextDocument(uri);
  return await vscode.window.showTextDocument(document);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function cleanup() {
  await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
}
