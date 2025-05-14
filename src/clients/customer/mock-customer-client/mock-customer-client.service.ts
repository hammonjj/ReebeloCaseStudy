import { Injectable } from '@nestjs/common';
import { ICustomerClient } from '../customer-client.interface';
import fixtures from 'mocks/customer';

export interface Customer {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class MockCustomerClientService implements ICustomerClient {
  async getCustomer(customerId: string): Promise<Customer | null> {
    return (fixtures as Record<string, Customer>)[customerId] ?? null;
  }
}
