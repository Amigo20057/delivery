import { IsArray, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items!: { productId: string; qty: number }[];

  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsString()
  comment!: string;

  @IsString()
  address!: string;
}
