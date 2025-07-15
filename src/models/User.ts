// models/User.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @field('email') email!: string;
  @field('password') password!: string;
  @field('is_logged_in') is_logged_in!: boolean; // ✅ Add this field
}
