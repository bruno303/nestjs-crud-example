import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { Sequelize, Transaction } from "sequelize/types";
import { configureSequelize } from "../../infra/persistence/sequelize";
import { Contract } from "../entities/contract";
import { Installment } from "../entities/installment";
import { ContractRepository } from "../repository/contract-repository";

@Injectable()
export class ContractCreateService {
    constructor(
        private readonly contractRepository: ContractRepository
    ) {}

    private readonly sequelize: Sequelize = configureSequelize()

    async create(request: ContractCreateRequest): Promise<Contract> {
        const installments: Array<Installment> = request.installments.map(i => {
            return new Installment(
                randomUUID(),
                i.number,
                i.dueDate,
                i.amount
            )
        })

        const contract = new Contract(
            randomUUID(),
            request.number,
            request.date,
            installments
        )

        const transaction: Transaction = await this.sequelize.transaction({
            autocommit: false
        })
        try {
            const contractCreated = await this.contractRepository.create(contract, transaction)
            await transaction.commit()
            return contractCreated
        } catch (err) {
            console.error(err)
            await transaction.rollback()
        }
    }
}

export class ContractCreateRequest {
    constructor(
        public readonly number: string,
        public readonly date: Date,
        public readonly installments: Array<ContractCreateInstallmentRequest>
    ) {}
}

export class ContractCreateInstallmentRequest {
    constructor(
        public readonly number: number,
        public readonly dueDate: Date,
        public readonly amount: number
    ) {}
}
