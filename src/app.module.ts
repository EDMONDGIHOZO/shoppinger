import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoryModule } from './product_category/product_category.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/shoppinger'),
    ProductModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
