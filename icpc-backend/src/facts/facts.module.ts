import { Module } from '@nestjs/common';
import { FactsService } from './facts.service';
import { FactsController } from './facts.controller';

@Module({
  controllers: [FactsController],
  providers: [FactsService]
})
export class FactsModule {}
