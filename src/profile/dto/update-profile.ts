// src/modules/users/dto/update-profile.dto.ts

import { IsOptional, IsString, IsDateString } from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;



  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}