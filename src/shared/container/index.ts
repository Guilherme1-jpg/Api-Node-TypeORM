import { container } from 'tsyringe';
import { ICustomersRepository } from '../../modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';

// a cada ciclo de vida da aplicação ele mantem uma unica instancia da classe 
container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);



