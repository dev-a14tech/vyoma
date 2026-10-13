import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  source?: string;
}

export class UpdateLeadStatusDto {
  @IsIn(['NEW', 'CONTACTED', 'CLOSED'])
  status!: 'NEW' | 'CONTACTED' | 'CLOSED';
}
