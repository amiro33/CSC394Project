import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local.guard';
import { JwtAuthGuard } from './jwt.guard';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from 'src/dto';
import { ApiExcludeController, ApiExcludeEndpoint } from '@nestjs/swagger';
@ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Post('')
  async createUser(@Body() { username, password }: AuthDto) {
    return await this.authService.createUser(username, password);
  }
  // @Get("")
  // async getAllUsers() {
  //   return await this.authService.getAllUsers();
  // }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return req.logout();
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }
}
