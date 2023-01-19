import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { ImagesModule } from 'src/images/images.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([News]), ImagesModule,
  MulterModule.register({
    storage: diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
          const uploadPath = './static/';
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
      },
      filename: (req: Request, file: Express.Multer.File, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(
            () => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      },

    }),
  }),],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule { }
