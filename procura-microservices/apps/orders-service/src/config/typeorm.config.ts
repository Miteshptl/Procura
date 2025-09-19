import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'orders_db',
  entities: [Order],
  synchronize: true,
};