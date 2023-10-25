import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilterProductDto } from '../dto/products/filter-product.dto';
import { CreateProductDto } from '../dto/products/create-product.dto';
import { Product } from '../database/schemas/products/product.schema';

@Controller('store')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/product')
  async createProduct(@Body() createProductDTO: CreateProductDto) {
    return await this.productService.addProduct(createProductDTO);
  }

  @Get('/products')
  async getProducts(@Query() filterProductDTO: FilterProductDto) {
    if (Object.keys(filterProductDTO).length) {
      return await this.productService.getFilteredProducts(filterProductDTO);
    } else {
      return await this.productService.getAllProducts();
    }
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  @Put('/product')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    if (!updatedProduct)
      throw new NotFoundException('Product can not be edited');
    return updatedProduct;
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product is not found');
    return product;
  }
}
