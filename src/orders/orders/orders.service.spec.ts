import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersService } from './orders.service';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { ICustomerClient } from '../../clients/customer/customer-client.interface';
import { IInventoryClient } from '../../clients/inventory/inventory-client.interface';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useClass: Repository },
        { provide: getRepositoryToken(OrderItem), useClass: Repository },
        {
          provide: ICustomerClient,
          useValue: { getCustomer: async (id: string) => ({ id, name: 'X', email: 'x@x.com' }) },
        },
        {
          provide: IInventoryClient,
          useValue: { checkStock: async () => true },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
