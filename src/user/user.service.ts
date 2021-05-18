import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, EditUserDto } from './dtos';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(email: string) {
        const user = await this.userRepository.findOne(email);
        if(!user) throw new NotFoundException('No se encuentra el usuario solicitado');

        return user;
    }

    async create(dto: CreateUserDto){
        const userExist = await this.userRepository.findOne({ email: dto.email });
        if(userExist) throw new BadRequestException(`El usuario con email ${dto.email} ya se encuentra registrado`);

        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);
        delete user.password;

        return user;
    }

    async editOne(email: string, dto: EditUserDto){
        const user = await this.userRepository.findOne(email);

        if(!user) throw new NotFoundException('No se encuentra el usuario solicitado');

        const editUser = Object.assign(user, dto);
        return await this.userRepository.save(editUser);
    }

    async deleteOne(email: string){
        return await this.userRepository.delete(email);
    }

    async findByEmail(email: string){
        return await this.userRepository
            .createQueryBuilder('user')
            .where({ email: email })
            .addSelect('user.password')
            .getOne();
    }
}
