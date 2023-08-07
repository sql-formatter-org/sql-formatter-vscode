import { SqlLanguage } from 'sql-formatter';

export const sqlDialects: { [lang: string]: SqlLanguage } = {
  'sql': 'sql',
  'plsql': 'plsql',
  'mysql': 'mysql',
  'postgres': 'postgresql',
  'hql': 'hive',
  'hive-sql': 'hive',
  'snowflake': 'snowflake',
  'sql-bigquery': 'bigquery',
  'sqlite': 'sqlite',
};
