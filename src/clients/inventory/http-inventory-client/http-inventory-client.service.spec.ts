import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { HttpInventoryClientService } from './http-inventory-client.service';

describe('HttpInventoryClientService', () => {
  let service: HttpInventoryClientService;

  beforeEach(async function () {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HttpInventoryClientService],
    }).compile();

    service = module.get<HttpInventoryClientService>(HttpInventoryClientService);
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });
});
