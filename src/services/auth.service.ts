import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/dtos/auth.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: UserRepository) { }

    async loginUser(authDto: AuthDto): Promise<BaseResponseDto> {
        const { username, password } = authDto;

        const user = await this.userRepository.findOneBy({ username });

        if (user) {
            const res = await bcrypt.compare(password, user.password);
            if (res) {
                return {
                    status: 200,
                    message: 'Login successfully',
                }
            } else {
                return {
                    status: 401,
                    message: 'Username or password is incorrect',
                }
            }
        } else {
            return {
                status: 404,
                message: 'User not found',
            }
        }
    }

    async sigupUser(authDto: AuthDto): Promise<BaseResponseDto> {
        try {
            const saltRounds = 10;
            const hashOut = await bcrypt.hash(authDto.password, saltRounds);

            await this.userRepository.save({
                ...authDto,
                password: String(hashOut),
            })

            return {
                status: 201,
                message: 'Create user successfully',
            };
        } catch (error) {
            console.log(error);

            if (error.code === '23505') {
                return {
                    status: 409,
                    message: 'Username already exists',
                }
            } else {
                return {
                    status: 500,
                    message: 'Internal server error',
                }
            }
        }
    }
}
