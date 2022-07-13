import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import path from "path";
import uploadConfig from '../../../config/upload'
import fs from "fs";

interface IRequest {
    user_Id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async execute({ user_Id, avatarFileName }: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_Id);

        if (!user) {
            throw new AppError('user is not found')
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName;

        await usersRepository.save(user)

        return user;
    }
}

export default UpdateUserAvatarService;