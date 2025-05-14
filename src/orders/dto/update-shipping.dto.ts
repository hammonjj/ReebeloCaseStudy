import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateShippingDto {
  @IsNotEmpty()
  @IsString()
  trackingCompany: string;

  @IsNotEmpty()
  @IsString()
  trackingNumber: string;
}
