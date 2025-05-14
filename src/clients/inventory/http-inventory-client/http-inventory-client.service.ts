import { Injectable } from '@nestjs/common';
import { IInventoryClient } from '../inventory-client.interface';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

@Injectable()
export class HttpInventoryClientService implements IInventoryClient {
  async checkStock(productId: string, quantity: number): Promise<boolean> {
    const response = await axios.get(`https://inventory-service/api/products/${productId}/stock`, {
      params: { quantity },
    });
    return response.data.inStock;
  }
}
