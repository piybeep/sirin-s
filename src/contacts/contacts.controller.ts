import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Contacts, contactsType } from './contacts.entity';

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

  @Post()
  create(@Body() dto: { type: contactsType; data: string }) {
    return this.contactsService.create(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
