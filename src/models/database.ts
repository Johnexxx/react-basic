// src/models/database.ts
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import Note from './Note';
import User from './User';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  unsafeDisableIntegrityCheck: true,
  migrations: undefined,
  onSetUpError: error => {
    console.error('DB setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Note, User], // ✅ These must be classes extending Model
});
