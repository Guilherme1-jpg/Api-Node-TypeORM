
import AppError from "../../../shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found')
        }

        const customerExists = await customerRepository.findByEmail(email);

        if (customerExists && email != customer.id) {
            throw new AppError('There is already one customer with this email')
        }


        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer)

        return customer
    }
}

export default UpdateCustomerService;