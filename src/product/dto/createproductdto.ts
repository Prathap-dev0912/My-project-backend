import { IsString, IsNumber, IsEmail } from 'class-validator';

export class CreateProductDto {

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEmail()
  email: string;

  @IsNumber()
  mobile: number;

  @IsString()
  type: string;

  @IsString()
  userId: string;
}
