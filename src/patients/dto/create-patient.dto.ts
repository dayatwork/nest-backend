import {
  IsDateString,
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsEnum,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsDateString()
  readonly dob: string;

  @IsEnum(['active', 'inactive'])
  readonly status: string;

  @IsEnum(['male', 'female'])
  readonly gender: string;
}
