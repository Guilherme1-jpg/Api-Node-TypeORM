import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import Customer from "../typeorm/entities/Customer";


interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('customer not found')
        }

        return customer
    }
}

export default ShowCustomerService;