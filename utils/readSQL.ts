import * as fs from 'fs';
import * as path from 'path';

interface readSQLProps {
  file: string;
}

export const readSQL = (file: readSQLProps) => {
  const sql = fs.readFileSync(sqlPath, 'utf8');
  return sql;
}
