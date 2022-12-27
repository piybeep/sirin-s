import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { CrewModule } from './crew/crew.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContactsModule } from './contacts/contacts.module';
import { CoursesModule } from './courses/courses.module';
import { getMailConfig } from './mail/mail.config';

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
        }), SessionsModule, UsersModule, MailerModule, CrewModule, ReviewsModule, ContactsModule, CoursesModule],
})
export class AppModule { }