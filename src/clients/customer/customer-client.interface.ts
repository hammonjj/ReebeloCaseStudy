export interface Customer {
  id: string;
  name: string;
  email: string;
}

export abstract class ICustomerClient {
  abstract getCustomer(customerId: string): Promise<Customer | null>;
}