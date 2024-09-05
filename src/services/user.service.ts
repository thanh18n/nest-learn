import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseResponseDto } from "src/dtos/base-response.dto";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { UserRepository } from "src/repositories/auth.repository";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: UserRepository) { }

    async getUser(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map(({ password, ...rest }) => rest);
    }

    async getUserDetail(id: number): Promise<BaseResponseDto<UserDto>> {
        const user = await this.userRepository.findOneBy({ id });
        const { password, ...userWithoutPassword } = user

        if (user) {
            return {
                status: 200,
                data: userWithoutPassword
            }
        }

        return {
            status: 404,
            message: 'User not found'
        }
    }
}