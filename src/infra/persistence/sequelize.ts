import { Sequelize } from "sequelize-typescript";
import { ContractModel, InstallmentModel } from "./models/contract-model";

export function configureSequelize(): Sequelize {
    return new Sequelize('postgres://postgres:root@localhost:5432/crud', {
        models: [ContractModel, InstallmentModel]
    })
}