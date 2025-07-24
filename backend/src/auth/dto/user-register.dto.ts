import {
  Equals,
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';

/**
 * user register data transfer object
 */
export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsLowercase()
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'minLength-{"ln":6,"count":6}',
  })
  @Matches(/.*[0-9].*[0-9].*/, {
    message: 'Password must contain at least 2 numbers',
  })
  @Matches(
    /.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?].*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?].*/,
    {
      message: 'Password must contain at least 2 symbols',
    },
  )
  password: string;

  @IsString()
  @Validate(Equals, ['password'], {
    message: 'password confirmation does not match password',
  })
  confirmPassword: string;
}
