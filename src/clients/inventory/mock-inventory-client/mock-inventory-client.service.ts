import { Injectable } from '@nestjs/common';
import { IInventoryClient } from '../inventory-client.interface';
import fixtures from 'mocks/inventory';

@Injectable()
export class MockInventoryClientService implements IInventoryClient {
  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const record = fixtures[productId];
    return record?.available >= quantity;
  }
}