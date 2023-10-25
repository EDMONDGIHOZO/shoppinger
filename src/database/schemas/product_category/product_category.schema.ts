import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema()
export class ProductCategory {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  color?: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
