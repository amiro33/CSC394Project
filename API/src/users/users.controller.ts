import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdditionalUserPropsDTO } from 'src/dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateUser(
    @Req() req,
    @Body() additionalUserPropsDTO: AdditionalUserPropsDTO,
  ) {
    console.log('updateUser', req.user.userId);
    return await this.usersService.updateAdditionalProperties(
      req.user.userId,
      additionalUserPropsDTO,
    );
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Req() req) {
    return await this.usersService.findOneById(req.user.userId);
  }
}
