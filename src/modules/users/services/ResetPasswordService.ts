import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../infra/typeorm/repositories/UsersTokensRepository";
import { isAfter, addHours } from 'date-fns'
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);

        const userTokenRepository = getCustomRepository(UsersTokensRepository)

        const userToken = await userTokenRepository.findByToken(token)

        if (!userToken) {
            throw new AppError("User Token does not exists")
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not exists")
        }

        const tokenCreated = userToken.created_at;

        const compareDate = addHours(tokenCreated, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired")
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user)
    }
}

export default ResetPasswordService;