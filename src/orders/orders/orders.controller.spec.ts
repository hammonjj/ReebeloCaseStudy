import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ICustomerClient } from '../../clients/customer/customer-client.interface';
import { IInventoryClient } from '../../clients/inventory/inventory-client.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
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

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
