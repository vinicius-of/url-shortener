import { AuthenticateDto, CreateLoginDto } from '@app/shared';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@app/shared/decorators';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('/login')
    async login(@Body() data: AuthenticateDto) {
        return await this.authService.autheticate(data);
    }

    @Public()
    @Post('/signup')
    async createLogin(@Body() data: CreateLoginDto) {
        await this.authService.createLogin(data);
        return await this.authService.autheticate(data);
    }
}
