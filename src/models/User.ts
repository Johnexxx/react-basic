import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class User extends Model {
  static table = 'users';

  @text('name') name!: string;
  @text('email') email!: string;
  @text('password') password!: string;
}
