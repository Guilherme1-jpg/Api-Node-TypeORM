import { EntityRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer>{
    public async findByName(name: string): Promise<Customer | undefined> {
        const Customer = await this.findOne({
            where: {
                name,
            },
        })

        return Customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const Customer = await this.findOne({
            where: {
                id,
            },
        })

        return Customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const Customer = await this.findOne({
            where: {
                email,
            },
        })

        return Customer;
    }
}



export default CustomersRepository;