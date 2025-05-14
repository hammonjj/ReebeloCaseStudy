
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ICustomerClient } from './customer/customer-client.interface';
import { MockCustomerClientService } from './customer/mock-customer-client/mock-customer-client.service';
import { HttpCustomerClientService } from './customer/http-customer-client/http-customer-client.service';
import { IInventoryClient } from './inventory/inventory-client.interface';
import { MockInventoryClientService } from './inventory/mock-inventory-client/mock-inventory-client.service';
import { HttpInventoryClientService } from './inventory/http-inventory-client/http-inventory-client.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ICustomerClient,
      useClass:
        process.env.NODE_ENV === 'development'
          ? MockCustomerClientService
          : HttpCustomerClientService,
    },
    {
      provide: IInventoryClient,
      useClass:
        process.env.NODE_ENV === 'development'
          ? MockInventoryClientService
          : HttpInventoryClientService,
    },
  ],
  exports: [ICustomerClient, IInventoryClient],
})

export class ClientsModule {}
