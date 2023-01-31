import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';

import { ImagesService } from './images.service';
import { AccessTokenGuard } from 'src/sessions/guards/access-token.guard';

@ApiTags('images')
@Controller('/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images', 100))
  async create(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.imagesService.create(files);
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    if (!id || isNaN(+id)) {
      throw new BadRequestException();
    }
    return await this.imagesService.getImage(+id);
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return await this.imagesService.deleteImage(+id);
  }
}
