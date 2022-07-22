import {
  IsDateString,
  IsEmail,
  IsString,
  IsPhoneNumber,
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
}
