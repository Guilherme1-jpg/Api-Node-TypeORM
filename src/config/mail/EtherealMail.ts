import nodemailer from 'nodemailer'
import handlebarsTemplate from './HandleBarsTemplate'

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseTemplate {
    file: string,
    variables: ITemplateVariable
}
interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseTemplate
}
export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })

        const mailTemplate = new handlebarsTemplate();

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Guilherme Henrique Dev',
                address: from?.email || 'henriquegui@gmail.com.br',
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await mailTemplate.parse(templateData)
        });
        //fins para test
        console.log('Message is: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}