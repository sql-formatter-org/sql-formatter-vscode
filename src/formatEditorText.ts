import { FormatOptionsWithLanguage, format } from 'sql-formatter';
import { endsWithNewline } from './stringUtils';

export function formatEditorText(text: string, config: FormatOptionsWithLanguage): string {
  return format(text, config) + (endsWithNewline(text) ? '\n' : '');
}
