import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponseDto } from 'src/dtos/base-response.dto';
import { ChangePasswordDTO, UserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async getUser(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    }));
  }

  async getUserDetail(id: number): Promise<BaseResponseDto<UserDto>> {
    const user = await this.userRepository.findOneBy({ id });

    if (user) {
      return {
        status: 200,
        data: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt,
        },
      };
    }

    return {
      status: 404,
      message: 'User not found',
    };
  }

  async changePassword(payload: ChangePasswordDTO): Promise<BaseResponseDto> {
    const { id, oldPassword, newPassword } = payload;

    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
      if (!checkOldPassword) {
        return {
          status: 401,
          message: 'Old password is incorrect',
        };
      }

      const comparePassword = await bcrypt.compare(newPassword, user.password);
      if (comparePassword) {
        return {
          status: 400,
          message: 'New password cannot be the same as the old password',
        };
      }

      const saltRounds = 10;
      const hashOut = await bcrypt.hash(newPassword, saltRounds);

      await this.userRepository.update(id, {
        password: hashOut,
      });

      return {
        status: 200,
        message: 'Password changed',
      };
    } else {
      return {
        status: 404,
        message: 'User not found',
      };
    }
  }
}
