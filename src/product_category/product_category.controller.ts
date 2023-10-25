import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProduct_categoryDto } from '../dto/product_category/create-product_category.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Get('/')
  async getCategories() {
    return this.productCategoryService.getCategories();
  }

  @Post('/create')
  async createProductCategory(@Body() payload: CreateProduct_categoryDto) {
    return await this.productCategoryService.addCategory(payload);
  }
}
