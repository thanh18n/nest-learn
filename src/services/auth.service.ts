import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { UserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity'; 
import { UserRepository } from 'src/repositories/auth.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) { }

    loginUser(userDto: UserDto): string {
        const { username, password } = userDto;

        if (username === 'admin' && password === 'string') {
            return 'Login success';
        }

        return 'User not found';
    }

    async sigupUser(userDto: UserDto): Promise<BaseResponseDto> {
        return this.userRepository.save(userDto).then(() => {
            return { 
                status: 201,
                message: 'Create user successfully',
            };
        }).catch((error) => {
            return {
                status: 500,
                message: error,
            }
        })
    }
}
