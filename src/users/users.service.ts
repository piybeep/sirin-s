import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    async createUser(userInput: CreateUserInput): Promise<Users> {
        const token = bcrypt.hashSync(userInput.password, bcrypt.genSaltSync(5))
        return await this.usersRepository.save({ email: userInput.email, token })
    }

    async findOneByEmail(email: string): Promise<Users | null> {
        return await this.usersRepository.findOne({ where: { email } })
    }

    async findOneById(id: number): Promise<Users | null> {
        return await this.usersRepository.findOneBy({ id })
    }

    async findOneBy(attr: any) {
        return await this.usersRepository.findOneBy(attr)
    }
}