import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInData } from '@app/shared';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ASSIGNED } from '@app/shared/decorators/publicEndpoint.decorator';

interface JwtPayload {
    email: string;
    sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ASSIGNED, [
            context.getClass(),
            context.getHandler(),
        ]);

        if (isPublicEndpoint) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const auth = request.headers.authorization;
        const token = auth?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);

            request.user = {
                email: tokenPayload.email,
                userId: tokenPayload.sub,
            } as SignInData;

            return true;
        } catch (error: unknown) {
            throw new UnauthorizedException();
        }
    }
}
