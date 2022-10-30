import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { Contract } from "../entities/contract";
import { ContractCreateRequest, ContractCreateService } from "../service/contract-create-service";
import { ContractQueryService } from "../service/contract-query-service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class ContractController {
    constructor(
        private readonly contractCreateService: ContractCreateService,
        private readonly contractQueryService: ContractQueryService
    ) {}

    @Get()
    async getAll(): Promise<Array<Contract>> {
        return this.contractQueryService.findAll()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() contractCreateRequest: ContractCreateRequest): Promise<Contract> {
        return await this.contractCreateService.create(contractCreateRequest)
    }
}