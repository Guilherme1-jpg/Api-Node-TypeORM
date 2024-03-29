
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import RedisCache from "../../../shared/cache/RedisCache";

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>('api-vendas-product-list');

        if (!products) {
            products = await productsRepository.find();

            await redisCache.save('api-vendas-product-list', products)
        }

        return products
    }
}

export default ListProductService;