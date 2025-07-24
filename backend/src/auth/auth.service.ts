import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSerializer } from './serializer/user.serializer';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * add new user
   * @param userRegisterDto
   */
  async create(userRegisterDto: UserRegisterDto): Promise<UserSerializer> {
    const user = this.userRepository.create(userRegisterDto);
    await user.save();
    return this.transform(user);
  }

  /**
   * add new user
   * @param user
   * @param userUpdateDto
   */
  async update(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<UserSerializer | null> {
    await this.userRepository.update({ id }, userUpdateDto);

    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });
    return updatedUser ? this.transform(updatedUser) : null;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: UserLoginDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  /**
   * transform user
   * @param model
   * @param transformOption
   */
  transform(model: User, transformOption = {}): UserSerializer {
    return plainToClass(
      UserSerializer,
      instanceToPlain(model, transformOption),
      transformOption,
    );
  }

  /**
   * Get cookie for logout action
   */
  getCookieForLogOut(): string[] {
    return [`Authentication=; HttpOnly; Path=/; Max-Age=0;`];
  }
}
