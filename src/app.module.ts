import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract-module';

@Module({
  imports: [ContractModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
