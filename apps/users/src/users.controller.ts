import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import {
    AddCountLinkDto,
    CreateUserDto,
    FindUserByEmailDto,
    USERS_ERROR_MESSAGES,
} from '@app/shared';
import { Public } from '@app/shared/decorators';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.createUser(data);
    }

    @Public()
    @Get('/:email')
    async findUserByEmail(@Param() params: FindUserByEmailDto) {
        return await this.usersService.findUserByEmail(params);
    }

    @Put()
    async addCountLinkToUser(@Body() data: AddCountLinkDto) {
        if (!data?.id) {
            return false;
        }

        const userFound = await this.usersService.findUserById({
            id: data.id,
        });

        if (!userFound) {
            throw new NotFoundException(USERS_ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return this.usersService.addCountLink(data);
    }
}
