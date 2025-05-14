import { IsEnum, IsUUID } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';

export class UpdateStatusDto {
  @IsUUID()
  id!: string;

  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
