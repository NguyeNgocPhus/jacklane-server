import { IsString } from 'class-validator';

export class SignInWithPasswordResponseDto {
  @IsString()
  token: string;
  @IsString()
  refreshToken: string;
}