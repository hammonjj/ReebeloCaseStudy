import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { HttpCustomerClientService } from './http-customer-client.service';

describe('HttpCustomerClientService', () => {
  let service: HttpCustomerClientService;

  beforeEach(async function () {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HttpCustomerClientService],
    }).compile();

    service = module.get<HttpCustomerClientService>(HttpCustomerClientService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });
});
