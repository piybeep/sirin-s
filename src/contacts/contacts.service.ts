import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacts, contactsType } from './contacts.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contacts)
    private readonly contactsRepository: Repository<Contacts>,
  ) {}

  getContacts() {
    return this.contactsRepository.find();
  }

  create(dto: { type: contactsType; data: string }) {
    const contacts = this.contactsRepository.create(dto);
    return this.contactsRepository.save(contacts);
  }

  async remove(id: number) {
    await this.contactsRepository.delete(id);
    return 'ok';
  }
}
