import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './auth.repository';
import { AuthDto, JwtDTO } from 'src/dtos/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtDTO): Promise<AuthDto> {
    const { username } = payload;

    const user = await this.userRepository.findOneBy({ username });

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
