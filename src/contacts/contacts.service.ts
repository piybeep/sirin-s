import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts } from './contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepository: Repository<Contacts>,
  ) {}
  getContacts() {
    return this.contactsRepository.find();
  }
}
