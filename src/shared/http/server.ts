import 'reflect-metadata'
import 'dotenv/config'
import path from "path";
import express, { Request, Response, NextFunction, response } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv';
import { errors } from 'celebrate'
import cors from 'cors'
import route from './routes'
import AppError from '../errors/AppError'
import '../typeorm'
import uploadConfig from '../../config/upload'
import { pagination } from 'typeorm-pagination'

dotenv.config()
const server = express();

server.use(cors());
server.use('/files', express.static(uploadConfig.directory))
server.use(express.json());
server.use(pagination)
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }))


server.use(route)

server.use(errors())


server.use((error: Error, request: Request, res: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

server.listen(process.env.PORT)