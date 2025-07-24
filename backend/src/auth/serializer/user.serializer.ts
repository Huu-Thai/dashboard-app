import { Transform } from 'class-transformer';

/**
 * user serializer
 */
export class UserSerializer {
  id: number;
  email: string;
  full_name: string;

  @Transform(({ value }) => (value !== 'null' ? value : ''))
  address_line_1: string;
  @Transform(({ value }) => (value !== 'null' ? value : ''))
  address_line_2: string;
  phone_number: string;
  city: string;
  state: string;
  country: string;
  nok_name: string;
  nok_phone_name: string;
}
