import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ASSIGNED } from '@app/shared/decorators/publicEndpoint.decorator';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
    email: string;
    sub: string;
}

type RequestWithUser = Request & {
    user: unknown;
};

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ASSIGNED, [
            context.getClass(),
            context.getHandler(),
        ]);

        if (isPublicEndpoint) {
            return true;
        }

        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            request.user = {
                email: tokenPayload.email,
                userId: tokenPayload.sub,
            };

            return true;
        } catch (error: unknown) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
