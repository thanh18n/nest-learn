import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/dtos/auth.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/auth.repository';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: UserRepository) { }

    loginUser(authDto: AuthDto): string {
        const { username, password } = authDto;

        if (username === 'admin' && password === 'string') {
            return 'Login success';
        }

        return 'User not found';
    }

    async sigupUser(authDto: AuthDto): Promise<BaseResponseDto> {
        return this.userRepository.save(authDto).then(() => {
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
