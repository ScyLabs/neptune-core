import { Test, TestingModule } from '@nestjs/testing';
import { NeptuneService } from './neptune.service';

describe('NeptuneService', () => {
  let service: NeptuneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeptuneService],
    }).compile();

    service = module.get<NeptuneService>(NeptuneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
