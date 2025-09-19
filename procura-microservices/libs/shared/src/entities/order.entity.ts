import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('json')
    customerDetails: {
        name: string;
        phone: string;
    };

    @Column('json')
    products: Array<{
        productId: number;
        quantity: number;
    }>;

    @Column('decimal')
    totalAmount: number;
}