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
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(authDto: AuthDto): Promise<BaseResponseDto> {
    const { username, password } = authDto;

    try {
      if (!username && !password) {
        return {
          status: 400,
          message: 'Username and password are required',
        };
      }
      if (!username) {
        return {
          status: 400,
          message: 'Username is required',
        };
      } else if (!password) {
        return {
          status: 400,
          message: 'Password is required',
        };
      } else {
        const user = await this.userRepository.findOneBy({
          username: username,
        });

        if (user) {
          const res = await bcrypt.compare(password, user.password);

          if (res) {
            const accessToken = this.jwtService.sign({
              id: user.id,
              username: user.username,
            });

            return {
              status: 200,
              message: 'Login successfully',
              data: {
                accessToken,
              },
            };
          }
        } else {
          return {
            status: 404,
            message: 'User not found',
          };
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
      };
    }
  }

  async sigupUser(authDto: AuthDto): Promise<BaseResponseDto> {
    const { username, password } = authDto;

    try {
      if (!username && !password) {
        return {
          status: 400,
          message: 'Username and password are required',
        };
      } else if (!username) {
        return {
          status: 400,
          message: 'Username is required',
        };
      } else if (!password) {
        return {
          status: 400,
          message: 'Password is required',
        };
      } else {
        const saltRounds = 10;
        const hashOut = await bcrypt.hash(password, saltRounds);

        await this.userRepository.save({
          ...authDto,
          password: String(hashOut),
        });

        return {
          status: 201,
          message: 'Create user successfully',
        };
      }
    } catch (error) {
      if (error.code === '23505') {
        return {
          status: 409,
          message: 'Username already exists',
        };
      } else
        return {
          status: 500,
          message: 'Internal server error',
        };
    }
  }
}
