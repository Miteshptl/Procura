export class CreateProductDto {
    readonly productCode: string;
    readonly productName: string;
    readonly productDescription: string;
    readonly productRate: number;
    readonly productImage: string;
}