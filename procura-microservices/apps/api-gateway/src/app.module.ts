import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.controller';
import { OrdersModule } from './modules/orders/orders.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SwaggerModule } from './swagger';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    SwaggerModule.setup('api', app);
  }
}