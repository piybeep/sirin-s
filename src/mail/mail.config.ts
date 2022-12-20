import { join } from 'path';
import { ConfigService } from "@nestjs/config";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const getMailConfig = async (
    configService: ConfigService,
): Promise<any> => {
    const conf = {
        transport: {
            host: configService.get('MAIL_HOST'),
            port: 465,
            secure: true,
            auth: {
                user: configService.get<string>('MAIL_USER'),
                pass: configService.get<string>('MAIL_PASSWORD'),
            },
        },
        defaults: {
            from: `"${configService.get("MAIL_FROM_NAME")}" <${configService.get("MAIL_USER")}>`,
        },
        template: {
            dir: join(__dirname, '/../templates'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
    };
    console.log(conf);
    return conf

};