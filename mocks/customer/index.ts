import { Customer } from 'src/clients/customer/customer-client.interface';
import customer1 from './1.json';
import customer2 from './2.json';

const fixtures: Record<string, Customer> = {
  [customer1.id]: customer1,
  [customer2.id]: customer2,
};

export default fixtures;
