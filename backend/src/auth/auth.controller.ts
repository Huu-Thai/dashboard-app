import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Request as CommonRequest,
  Res,
  UseGuards,
  ValidationPipe,
  Get,
  Put,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserSerializer } from './serializer/user.serializer';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe)
    userRegisterDto: UserRegisterDto,
  ): Promise<{ user?: UserSerializer; message: string; error: boolean }> {
    try {
      // Remove confirmPassword before saving
      const { confirmPassword, ...userData } = userRegisterDto;

      const user = await this.authService.create(userRegisterDto);

      return { user, error: false, message: 'User registered successfully' };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto);
    const { access_token } = result;
    res.cookie('token', access_token, {
      httpOnly: true,
      sameSite: 'lax', // or 'none' with https
      secure: false, // set true if using HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    return { access_token };
  }

  @Post('/logout')
  logOut(
    @Req()
    req: Request,
    @Res()
    res: Response,
  ) {
    try {
      res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
      return res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (e) {
      return res.sendStatus(HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CommonRequest() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@CommonRequest() req, @Body() userUpdateDto: UserUpdateDto) {
    const user = req.user;

    return this.authService.update(+user.id, userUpdateDto);
  }
}
