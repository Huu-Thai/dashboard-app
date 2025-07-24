import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const cookieExtractor = (req) => {
  const auth = req.headers['authorization'];

  if (req?.cookies?.token) {
    return req?.cookies?.token;
  } else if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7); // remove 'Bearer '
  } else {
    return null;
  }
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: 'dashboard-app-secret',
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: Number(payload.sub),
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
