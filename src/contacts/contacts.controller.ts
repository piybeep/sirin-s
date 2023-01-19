import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('contacts')
@Controller('/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Get()
  getContacts() {
    return this.contactsService.getContacts()
  }
}
