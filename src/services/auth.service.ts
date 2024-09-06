import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from 'src/dtos/auth.dto';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) { }

    async loginUser(authDto: AuthDto): Promise<BaseResponseDto> {
        const { username, password } = authDto;

        const user = await this.userRepository.findOneBy({ username });
        if (user) {
            const res = await bcrypt.compare(password, user.password);

            if (res) {
                const accessToken = this.jwtService.sign({
                    id: user.id,
                    username: user.username,
                })

                return {
                    status: 200,
                    message: 'Login successfully',
                    data: {
                        accessToken
                    }
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
