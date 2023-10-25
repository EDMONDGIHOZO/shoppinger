import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from '../database/schemas/products/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterProductDto } from '../dto/products/filter-product.dto';
import { CreateProductDto } from '../dto/products/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addProduct(createProductDTO: CreateProductDto): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(
    id: string,
    updateProductDTO: CreateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, updateProductDTO, {
      new: true,
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async getFilteredProducts(
    filterProductDTO: FilterProductDto,
  ): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
