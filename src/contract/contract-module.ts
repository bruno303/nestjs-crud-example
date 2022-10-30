import { Module } from "@nestjs/common";
import { ContractController } from "./controller/contract-controller";
import { ContractRepository } from "./repository/contract-repository";
import { ContractCreateService } from "./service/contract-create-service";
import { ContractQueryService } from "./service/contract-query-service";

@Module({
    imports: [],
    controllers: [ContractController],
    providers: [
        ContractCreateService,
        ContractQueryService,
        ContractRepository
    ]
})
export class ContractModule {}