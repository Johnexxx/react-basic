// src/models/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 2, // ⬅️ increment the version
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'is_logged_in', type: 'boolean' }, // ✅ new column
      ],
    }),
    tableSchema({
      name: 'notes',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'user_id', type: 'string' }, // ✅ to relate note to user
      ],
    }),
  ],
});
