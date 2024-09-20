import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { ChangePasswordDTO, UserDto } from 'src/dtos/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('/api/v1/user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(): Promise<UserDto[]> {
    return await this.userService.getUser();
  }

  @Get('/:id')
  async getUserDetail(
    @Param() params: { id: number },
  ): Promise<BaseResponseDto<UserDto>> {
    return await this.userService.getUserDetail(params.id);
  }

  @Post('/change-password')
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() payload: ChangePasswordDTO,
  ): Promise<BaseResponseDto> {
    return this.userService.changePassword(payload);
  }
}
