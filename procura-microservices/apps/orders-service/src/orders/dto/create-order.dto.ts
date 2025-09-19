export class CreateOrderDto {
    orderId: string;
    customerDetails: {
        name: string;
        phone: string;
    };
    products: Array<{
        productId: string;
        quantity: number;
    }>;
    totalAmount: number;
}