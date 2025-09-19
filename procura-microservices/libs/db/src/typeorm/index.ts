import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '@procura-microservices/shared/src/entities/product.entity';
import { Order } from '@procura-microservices/shared/src/entities/order.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'procura',
  entities: [Product, Order],
  synchronize: true,
  logging: true,
};