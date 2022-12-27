import { join } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from "@nestjs/config"

import { CrewModule } from './crew/crew.module';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';
import { getMailConfig } from './mail/mail.config';
import { CoursesModule } from './courses/courses.module';
import { SessionsModule } from './sessions/sessions.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: config.get<'postgres'>('TYPEORM_CONNECTION'),
                host: config.get<string>('TYPEORM_HOST'),
                username: config.get<string>('TYPEORM_USERNAME'),
                password: config.get<string>('TYPEORM_PASSWORD'),
                database: config.get<string>('TYPEORM_DATABASE'),
                port: config.get<number>('TYPEORM_PORT'),
                entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: false,
            })
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, 'static'),
            serveStaticOptions: {}
        }),
        MulterModule.register({
            storage: './static/',
            preservePath: true
        }),
        SessionsModule,
        UsersModule,
        MailerModule,
        CrewModule,
        ReviewsModule,
        ContactsModule,
        CoursesModule,
        NewsModule,
        ImagesModule],
})
export class AppModule { }