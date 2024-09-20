import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/dtos/auth.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('/api/v1/user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  loginUser(@Body() authDto: AuthDto): Promise<BaseResponseDto> {
    return this.authService.loginUser(authDto);
  }

  @Post('/signup')
  async sinupUser(@Body() authDto: AuthDto): Promise<BaseResponseDto> {
    return this.authService.sigupUser(authDto);
  }
}
