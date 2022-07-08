import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import CustomerController from "../controllers/CustomersController";

const customersRouter = Router();
const customersController = new CustomerController();

customersRouter.get('/', customersController.index);

customersRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
}), customersController.show);

customersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
    }
}), customersController.create);

customersRouter.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }

}), customersController.update);

customersRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
}), customersController.delete);

export default customersRouter;