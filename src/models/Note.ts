// models/Note.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Note extends Model {
  static table = 'notes';

  @field('title') title!: string;
  @field('body') body!: string;
  @field('user_id') user_id!: string; // ✅ links note to user
}
