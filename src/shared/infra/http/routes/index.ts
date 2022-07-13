import productsRouter from "../../../../modules/products/infra/http/routes/products.routes";
import { Router } from "express";
import usersRouter from "../../../../modules/users/infra/http/routes/users.routes";
import sessionsRouter from "../../../../modules/users/infra/http/routes/sessions.routes";
import passwordRouter from "../../../../modules/users/infra/http/routes/password.routes";
import profileRouter from "../../../../modules/users/infra/http/routes/profile.routes";
import customersRouter from "../../../../modules/customers/infra/http/routes/customers.routes";
import orderRouter from "../../../../modules/orders/infra/http/routes/orders.routes";

const route = Router();

route.use('/products', productsRouter);
route.use('/users', usersRouter);
route.use('/sessions', sessionsRouter)
route.use('/password', passwordRouter);
route.use('/profile', profileRouter);
route.use('/customer', customersRouter)
route.use('/orders', orderRouter)


export default route