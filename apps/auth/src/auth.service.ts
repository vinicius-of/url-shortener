import {
    AuthErrorMessages,
    AuthenticateDto,
    CreateLoginDto,
    CreateUserDto,
    FindUserByEmailDto,
    AuthService as SharedAuthService,
    User,
} from '@app/shared';
import { AuthResult, Login, SignInData } from '@app/shared/auth/auth.contract';
import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginEntity } from './entities/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hashSync } from 'bcrypt';
import { ConfigService, ConfigType } from '@nestjs/config';
import { apisHosts } from '@app/config/config.constants';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService implements SharedAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly axios: HttpService,
        @Inject(apisHosts.KEY) private readonly hosts: ConfigType<typeof apisHosts>,
        @InjectRepository(LoginEntity) private readonly loginRepository: Repository<LoginEntity>,
    ) {}

    async createLogin(data: CreateLoginDto): Promise<Login> {
        let loginCreated: LoginEntity;

        try {
            const loginExists = await this.loginRepository.findOneBy({
                email: data.email,
            });

            if (loginExists) {
                throw new BadRequestException(AuthErrorMessages.LoginAlreadyExists);
            }

            const salt = Number(this.configService.get<number>('BCRYPT_SALT'));
            const hashPassword = hashSync(data.password, salt);

            loginCreated = this.loginRepository.create({
                email: data.email,
                password: hashPassword,
            });
        } catch (error) {
            if (!(error instanceof InternalServerErrorException)) {
                throw error;
            }

            throw new InternalServerErrorException({
                message: AuthErrorMessages.LoginNotCreated,
                error: error,
            });
        }

        try {
            const userCreated = await this.createUserFromUsersApi({
                name: data.name,
                email: data.email,
            });

            loginCreated.userId = userCreated.id;
        } catch (error) {
            if (!(error instanceof InternalServerErrorException)) {
                throw error;
            }

            throw new InternalServerErrorException({
                message: AuthErrorMessages.LoginNotCreated,
                error: error,
            });
        }

        await this.loginRepository.insert(loginCreated);
        return loginCreated;
    }

    async autheticate(data: AuthenticateDto): Promise<AuthResult> {
        const acceptedLogin = await this.loginRepository.findOneBy({
            email: data.email,
        });

        if (!acceptedLogin) {
            throw new NotFoundException(AuthErrorMessages.LoginNotFound);
        }

        const passwordAccepted = await compare(data.password, acceptedLogin.password);

        if (!passwordAccepted) {
            throw new NotFoundException(AuthErrorMessages.WrongCredentials);
        }

        const tokenPayload = {
            sub: acceptedLogin.id,
            email: acceptedLogin.email,
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return {
            accessToken,
            id: acceptedLogin.id,
            userId: acceptedLogin.userId,
            email: acceptedLogin.email,
        };
    }

    async createUserFromUsersApi(data: CreateUserDto): Promise<User> {
        const response = await firstValueFrom(
            this.axios.post<User>(this.hosts.usersHost, data).pipe(
                catchError((error: AxiosError) => {
                    const { message, status, response } = error;

                    throw new HttpException(
                        {
                            message: AuthErrorMessages.UserNotCreated,
                            source: this.hosts.usersHost,
                            body: data,
                            httpMessage:
                                response?.data || message || AuthErrorMessages.ServiceNotResponding,
                        },
                        status || 404,
                    );
                }),
            ),
        );

        return response.data;
    }

    async findUserFromUsersApi({ email }: FindUserByEmailDto): Promise<SignInData> {
        const response = await firstValueFrom(
            this.axios.get<User>(`${this.hosts.usersHost}/${email}`).pipe(
                catchError((error: AxiosError) => {
                    const { message, status, response } = error;
                    throw new HttpException(
                        {
                            message: AuthErrorMessages.ServiceError,
                            source: this.hosts.usersHost,
                            httpMessage: response?.data || message,
                        },
                        status || 500,
                    );
                }),
            ),
        );

        const { email: userEmail, id } = response.data;

        return {
            email: userEmail,
            userId: id,
        };
    }
}
