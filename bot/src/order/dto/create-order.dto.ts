export class CreateOrderDto {
  items: { productId: string; qty: number }[];
  name?: string;
  phone?: string;
  comment?: string;
}
