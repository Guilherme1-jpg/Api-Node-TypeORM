import { ICreateCustomer } from "../../../../customers/domain/models/ICreateCustomer";
import { getRepository, Repository } from "typeorm";
import { ICustomersRepository } from '../../../domain/repositories/ICustomerRepository'
import Customer from "../entities/Customer";

//implemnta regra de negocio
class CustomersRepository implements ICustomersRepository {
    //atributo para receber o metodo repositorio
    private ormRepository: Repository<Customer>;
    constructor() {
        this.ormRepository = getRepository(Customer)
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({ name, email });

        await this.ormRepository.save(customer)

        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        await this.ormRepository.save(customer);

        return customer
    }

    public async findByName(name: string): Promise<Customer | undefined> {
        const Customer = await this.ormRepository.findOne({
            where: {
                name,
            },
        })

        return Customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const Customer = await this.ormRepository.findOne({
            where: {
                id,
            },
        })

        return Customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const Customer = await this.ormRepository.findOne({
            where: {
                email,
            },
        })

        return Customer;
    }
}



export default CustomersRepository;