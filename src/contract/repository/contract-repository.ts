import { Injectable } from "@nestjs/common";
import { Contract } from "../entities/contract";
import { ContractModel, InstallmentModel } from "../../infra/persistence/models/contract-model";
import { Installment } from "../entities/installment";
import { Transaction } from "sequelize/types";

@Injectable()
export class ContractRepository {
    async findAll(): Promise<Array<Contract>> {
        const contracts = await ContractModel.findAll()
        const response = contracts.map(async c => {
            return await this.toContract(c)
        })

        return Promise.all(response)
    }

    async findById(id: string): Promise<Contract | null> {
        const contract = await ContractModel.findByPk(id)
        if (!contract) return null
        return await this.toContract(contract)
    }

    async create(contract: Contract, transaction: Transaction | null = null): Promise<Contract> {
        let contractCreated = this.toContractModel(contract)
        const installmentModels = contract.installments.map(i => this.toInstallmentModel(i, contract.id))
        contractCreated = await contractCreated.save({ transaction })
        const installmentPromises: Array<Promise<InstallmentModel>> = installmentModels
            .map(async i => await i.save({ transaction }))
        await Promise.all(installmentPromises)
        return this.toContractForCreation(contractCreated, installmentModels)
    }

    async update(contract: Contract): Promise<Contract> {
        const contractFound = await ContractModel.findByPk(contract.id)
        if (contractFound == null) return await this.create(contract)
        
        const contractUpdated = await contractFound.update({ number: contract.number, date: contract.date })
        let installmentModels = await InstallmentModel.findAll({
            where: { contractId: contractFound.id }
        })
        const promises = installmentModels.map(async i => {
            const installment = contract.installments.filter(it => it.id == i.id)[0]
            return await i.update({
                number: installment.number,
                dueDate: installment.dueDate,
                amount: installment.amount
            })
        })
        installmentModels = await Promise.all(promises)
        return this.toContractForCreation(contractUpdated, installmentModels)
    }

    async delete(contract: Contract): Promise<void> {
        const contractFound = await ContractModel.findByPk(contract.id)
        if (!contractFound) return
        contractFound.destroy()
    }

    private async toContract(contract: ContractModel): Promise<Contract> {
        const contractFound: ContractModel = contract.get({ plain: true })
        const installmentModels = await InstallmentModel.findAll({
            where: { contractId: contractFound.id }
        })
        const installments: Array<Installment> = installmentModels
            .map(i => i.get({ plain: true }))
            .map(i => new Installment(i.id, i.number, i.dueDate, i.amount))
        return new Contract(
            contractFound.id,
            contractFound.number,
            contractFound.date,
            installments
        )
    }

    toContractForCreation(source: ContractModel, installments: Array<InstallmentModel>): Contract {
        const installmentsEntities: Array<Installment> = installments.map(i => {
            return new Installment(
                i.id,
                i.number,
                i.dueDate,
                i.amount
            )
        })

        return new Contract(
            source.id,
            source.number,
            source.date,
            installmentsEntities
        )
    }

    toInstallmentModel(source: Installment, contractId: string): InstallmentModel {
        return InstallmentModel.build({
            id: source.id,
            contractId: contractId,
            number: source.number,
            dueDate: source.dueDate,
            amount: source.amount
        })
    }

    toContractModel(source: Contract): ContractModel {
        return ContractModel.build({
            id: source.id,
            number: source.number,
            date: source.date
        })
    }
}