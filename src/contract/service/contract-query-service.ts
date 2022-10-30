import { Injectable } from "@nestjs/common";
import { Contract } from "../entities/contract";
import { ContractRepository } from "../repository/contract-repository";

@Injectable()
export class ContractQueryService {
    constructor(
        private readonly contractRepository: ContractRepository
    ) {}

    async findAll(): Promise<Array<Contract>> {
        return this.contractRepository.findAll()
    }
}