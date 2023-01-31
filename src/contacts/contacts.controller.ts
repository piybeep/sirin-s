import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger/dist/decorators';
import { Contacts } from './contacts.entity';

@ApiTags('contacts')
@Controller('/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  
  @ApiOkResponse({
    type: Contacts,
    isArray: true,
  })
  @Get()
  getContacts() {
    return this.contactsService.getContacts();
  }
}
