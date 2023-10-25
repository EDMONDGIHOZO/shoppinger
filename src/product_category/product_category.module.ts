import { Module } from '@nestjs/common';
import { ProductCategoryController } from './product_category.controller';
import { ProductCategoryService } from './product_category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategorySchema } from '../database/schemas/product_category/product_category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product_category', schema: ProductCategorySchema },
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
