import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) { }

    async sendNewApplicationMail(application: any) {
        return await this.mailerService
            .sendMail({
                to: this.configService.get<string>("MAIL_TO"),
                subject: 'Новая заявка',
                template: join(__dirname, '../mail/templates/', 'newApplication.hbs'),
                context: {
                    id: application.id,
                    fullname_applicant: application.fullname_applicant,
                    fullname_student: application.fullname_student,
                    age_student: application.age_student,
                    contact: application.contact,
                    place: application.place
                },
            })
            .catch((e) => {
                console.log(e);

                throw new HttpException(
                    `Ошибка работы почты: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            });
    }
}
