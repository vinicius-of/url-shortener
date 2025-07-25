import {
    AddCountLinkDto,
    CreateUserDto,
    FindUserByEmailDto,
    FindUserByIdDto,
    UsersService as SharedUserService,
    User,
    UserErrorMessages,
} from '@app/shared';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService implements SharedUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(data: CreateUserDto): Promise<User> {
        try {
            const entity = this.userRepository.create({
                email: data.email,
                name: data.name,
            });

            await this.userRepository.insert(entity);

            return entity;
        } catch (error: unknown) {
            throw new BadRequestException(UserErrorMessages.UserAlreadyExists);
        }
    }

    async findUserByEmail(data: FindUserByEmailDto): Promise<User> {
        try {
            const userFound = await this.userRepository.findOneBy({
                email: data.email,
            });

            if (!userFound) {
                throw new NotFoundException(UserErrorMessages.UserNotFound);
            }

            return userFound;
        } catch (error) {
            throw new InternalServerErrorException(
                {
                    message: UserErrorMessages.InternalServerError,
                    error,
                },
                {
                    cause: new Error(error),
                },
            );
        }
    }

    async findUserById(data: FindUserByIdDto): Promise<User> {
        const userFound = await this.userRepository.findOneBy({
            id: data.id,
        });

        if (!userFound) {
            throw new NotFoundException(UserErrorMessages.UserNotFound);
        }

        return userFound;
    }

    async addCountLink(data: AddCountLinkDto): Promise<boolean> {
        await this.userRepository
            .createQueryBuilder()
            .update()
            .set({
                linksCount: () => 'linksCount + 1',
            })
            .where('id = :id', {
                id: data.id,
            })
            .execute();

        return true;
    }
}
