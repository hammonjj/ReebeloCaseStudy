import { Injectable } from '@nestjs/common';
import { ICustomerClient } from '../customer-client.interface';
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export interface Customer {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class HttpCustomerClientService implements ICustomerClient {
  async getCustomer(customerId: string): Promise<Customer> {
    const response = await axios.get(
      `${process.env.CUSTOMER_SERVICE_URL}/customers/${customerId}`
    );
    return response.data;
  }
}






