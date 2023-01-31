import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './images.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join, resolve } from 'path';
import { Request } from 'express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Images]),
    MulterModule.registerAsync({
      useFactory: async () => ({
        dest: join(resolve(), 'dist', 'static'),
        storage: diskStorage({
          destination: (req: Request, file: Express.Multer.File, cb) => {
            const uploadPath = join(resolve(), 'dist', 'static');

            if (!existsSync(uploadPath)) {
              mkdirSync(uploadPath);
              console.log('"static" directory created.', Date.now());
            }
            cb(null, uploadPath);
          },
          filename: (req: Request, file: Express.Multer.File, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
