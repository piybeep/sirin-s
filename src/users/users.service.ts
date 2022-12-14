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
    ) {

    }
    async createUser(userInput: CreateUserInput): Promise<Users> {
        const token = bcrypt.hashSync(userInput.password, bcrypt.genSaltSync())
        return await this.usersRepository.save({ email: userInput.email, token })
    }

    async getAllUsers(): Promise<Users[]> {
        return await this.usersRepository.find()
    }

    async findOne(email: string): Promise<Users | null> {
        return await this.usersRepository.findOne({ where: { email } })
    }
}