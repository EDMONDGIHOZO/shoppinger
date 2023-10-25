import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../database/schemas/product_category/product_category.schema';
import { CreateProduct_categoryDto } from '../dto/product_category/create-product_category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel('Product_category')
    private readonly productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async addCategory(
    payload: CreateProduct_categoryDto,
  ): Promise<ProductCategory> {
    const newCategory = await this.productCategoryModel.create(payload);
    return newCategory.save();
  }

  async getCategories(): Promise<ProductCategory[]> {
    return await this.productCategoryModel.find().exec();
  }
}
