import { Controller, Get, Param } from "@nestjs/common";
import { BaseResponseDto } from "src/dtos/base-response.dto";
import { UserDto } from "src/dtos/user.dto";
import { UserService } from "src/services/user.service";

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUser(): Promise<UserDto[]> {
        return await this.userService.getUser();
    }

    @Get('/:id')
    async getUserDetail(@Param() params: { id: number }): Promise<BaseResponseDto<UserDto>> {
        return await this.userService.getUserDetail(params.id);
    }
}