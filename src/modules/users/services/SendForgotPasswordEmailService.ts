import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from '../../../config/mail/EtherealMail'
import path from 'path'

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UsersTokensRepository)

        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User does not exists")
        }

        const { token } = await userTokenRepository.generate(user.id);

        const pathTemplate = path.resolve(__dirname, '..', 'views', 'forgotPass.hbs')

        //link = simulates that we have a route in the front
        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API vendas], Recovery password',
            templateData: {
                file: pathTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;