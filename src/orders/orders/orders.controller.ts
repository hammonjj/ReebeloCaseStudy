import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateShippingDto } from '../dto/update-shipping.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created', type: Order })
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
  async list(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the order', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Order details', type: Order })
  async fetch(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'id', description: 'UUID of the order' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: 200, description: 'Updated order', type: Order })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto): Promise<Order> {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Patch(':id/shipping')
  @ApiOperation({ summary: 'Update shipping information of an order' })
  @ApiParam({ name: 'id', description: 'UUID of the order' })
  @ApiBody({ type: UpdateShippingDto })
  @ApiResponse({ status: 200, description: 'Updated order', type: Order })
  async updateShipping(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ): Promise<Order> {
    return this.ordersService.updateShipping(id, updateShippingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', description: 'UUID of the order' })
  @ApiResponse({ status: 204, description: 'Order deleted' })
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
