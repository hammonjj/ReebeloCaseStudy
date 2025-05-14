import {
  IsUUID,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 'sku-001', description: 'Product identifier' })
  @IsString()
  productId!: string;

  @ApiProperty({ example: 2, description: 'Quantity to order', minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;

  // Note to Self: I chose to use cents for price to avoid floating point issues
  // Additional Note: I chose to include price as a property because when dealing with contracts, prices can vary
  @ApiProperty({ example: 4999, description: 'Price in cents' })
  @IsInt()
  @Min(0)
  price!: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Customer UUID' })
  @IsUUID()
  customerId!: string;

  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
