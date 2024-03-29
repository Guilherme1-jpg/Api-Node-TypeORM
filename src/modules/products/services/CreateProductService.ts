import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import RedisCache from "../../../shared/cache/RedisCache";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('there is already one product with this name');
        }

        const product = productsRepository.create({
            name, price, quantity
        })

        await redisCache.invalidate('api-vendas-product-list')

        await productsRepository.save(product)

        return product
    }
}

export default CreateProductService;