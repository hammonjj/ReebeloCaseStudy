import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { ICustomerClient } from '../../clients/customer/customer-client.interface';
import { IInventoryClient } from '../../clients/inventory/inventory-client.interface';
import { OrderStatus } from '../entities/order-status.enum';
import { UpdateShippingDto } from '../dto/update-shipping.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private readonly itemsRepo: Repository<OrderItem>,
    @Inject(ICustomerClient) private readonly customerClient: ICustomerClient,
    @Inject(IInventoryClient) private readonly inventoryClient: IInventoryClient,
  ) {}

  async create(createDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerClient.getCustomer(createDto.customerId);
    if (!customer) {
      throw new NotFoundException(`Customer ${createDto.customerId} not found`);
    }

    // This should really be either a call that can check all items at once or placed in an async for loop to avoid blocking
    for (const item of createDto.items) {
      const inStock = await this.inventoryClient.checkStock(item.productId, item.quantity);
      if (!inStock) {
        throw new BadRequestException(`Insufficient stock for product ${item.productId}`);
      }
    }

    const order = this.ordersRepo.create({
      customerId: createDto.customerId,
      status: OrderStatus.PENDING,
    });

    await this.ordersRepo.save(order);

    const orderItems = createDto.items.map((i) =>
      this.itemsRepo.create({ ...i, order }),
    );

    await this.itemsRepo.save(orderItems);

    order.items = orderItems;
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepo.find({ relations: ['items'] });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepo.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order;
  }

  async updateStatus(id: string, status: UpdateStatusDto['status']): Promise<Order> {
    const order = await this.findById(id);
    order.status = status;
    return this.ordersRepo.save(order);
  }

  async updateShipping(orderId: string, updateShippingDto: UpdateShippingDto): Promise<Order> {
    const order = await this.ordersRepo.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.trackingCompany = updateShippingDto.trackingCompany;
    order.trackingNumber = updateShippingDto.trackingNumber;

    return this.ordersRepo.save(order);
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await this.ordersRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.ordersRepo.remove(order);
  }
}
