import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }
    @Get(':id') 
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.findOneById(id);
    }
}