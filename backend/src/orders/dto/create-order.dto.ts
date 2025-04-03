import { IsString, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  products: string[];

  @IsNumber()
  total: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
