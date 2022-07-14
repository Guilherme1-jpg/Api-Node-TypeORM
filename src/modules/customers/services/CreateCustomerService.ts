import AppError from "../../../shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from '../domain/models/ICustomer';
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCustomerService {
    //receber do controler qual repositorio vai usar
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository) { }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {


        const emailExists = await this.customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used')
        }

        const customer = await this.customersRepository.create({
            name,
            email,
        })

        return customer;

    }
}

export default CreateCustomerService;