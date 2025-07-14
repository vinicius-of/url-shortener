import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddCountLinkDto, CreateUserDto, FindUserByEmailDto, UserErrorMessages } from '@app/shared';
import { Public } from '@app/shared/decorators';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    @ApiOperation({
        summary: 'Creates new user',
    })
    @ApiResponse({
        status: 201,
        description: 'User created with success',
    })
    @ApiResponse({
        status: 400,
        description: 'User already exists',
    })
    async create(@Body() data: CreateUserDto) {
        return await this.usersService.createUser(data);
    }

    @Get('/:email')
    @ApiOperation({
        summary: 'Find user by email (internal only)',
    })
    @ApiResponse({
        status: 200,
        description: 'User found',
    })
    @ApiResponse({
        status: 404,
        description: 'User not found',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error by trying to find user in the database',
    })
    async findUserByEmail(@Param() params: FindUserByEmailDto) {
        return await this.usersService.findUserByEmail(params);
    }

    @Put()
    @ApiOperation({
        summary: 'Add 1 into urls counter to the user (internal only)',
    })
    @ApiResponse({
        status: 200,
        description: 'Link count added to the user',
    })
    async addCountLinkToUser(@Body() data: AddCountLinkDto) {
        if (!data?.id) {
            return false;
        }

        const userFound = await this.usersService.findUserById({
            id: data.id,
        });

        if (!userFound) {
            throw new NotFoundException(UserErrorMessages.UserNotFound);
        }

        return this.usersService.addCountLink(data);
    }
}
