import { Module } from '@nestjs/common';
import { FactsService } from './facts.service';
import { FactsController } from './facts.controller';

/*
Facts module: configures the integration of the facts service and controller for managing facts in the system.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  controllers: [FactsController],
  providers: [FactsService]
})
export class FactsModule {}
