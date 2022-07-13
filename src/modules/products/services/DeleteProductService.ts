
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import RedisCache from "../../../shared/cache/RedisCache";


interface IRequest {
    id: string
}
class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('product not found.')
        }

        await redisCache.invalidate('api-vendas-product-list')
        await productsRepository.remove(product)
    }
}

export default DeleteProductService;