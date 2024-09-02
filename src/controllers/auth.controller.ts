import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { UserDto } from 'src/dtos/user.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('/api/v1/user')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/auth')
    loginUser(@Body() userDto: UserDto): string {
        return this.authService.loginUser(userDto);
    }

    @Post('/signup')
    async sinupUser(@Body() userDto: UserDto): Promise<BaseResponseDto> {
        return this.authService.sigupUser(userDto);
    }
}
