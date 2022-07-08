import productsRouter from "../../../modules/products/routes/products.routes";
import { Router } from "express";
import usersRouter from "../../../modules/users/routes/users.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import passwordRouter from "../../../modules/users/routes/password.routes";
import profileRouter from "../../../modules/users/routes/profile.routes";
import customersRouter from "../../../modules/customers/routes/customers.routes";
import orderRouter from "../../../modules/orders/routes/orders.routes";

const route = Router();

route.use('/products', productsRouter);
route.use('/users', usersRouter);
route.use('/sessions', sessionsRouter)
route.use('/password', passwordRouter);
route.use('/profile', profileRouter);
route.use('/customer', customersRouter)
route.use('/orders', orderRouter)


export default route