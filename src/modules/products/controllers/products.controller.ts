import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../common/controller.decorator';
import { ProductsControllerInterface } from './products.controller.interface';
import { ProductsServiceInterface } from '../services/products.service.interface';

@Controller
export class ProductsController implements ProductsControllerInterface {
  constructor(private readonly productsService: ProductsServiceInterface) {}

  async createProduct(req: Request, res: Response, next: NextFunction) {
    return res.status(201).json({
      data: req.body,
    });
  }
}
