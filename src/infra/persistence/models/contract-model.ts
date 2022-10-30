import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table({ tableName: "contracts" })
export class ContractModel extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare number: string

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    declare date: Date
}

@Table({ tableName: "installments" })
export class InstallmentModel extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare id: string

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare contractId: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare number: number

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    declare dueDate: Date

    // integer because it's recommended to avoid floating point issues
    // and for this: https://github.com/sequelize/sequelize/issues/8019
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare amount: number
}