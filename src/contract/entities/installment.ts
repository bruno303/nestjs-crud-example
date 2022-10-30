export class Installment {
    constructor(
        private _id: string,
        private _number: number,
        private _dueDate: Date,
        private _amount: number
    ) {}

    get id() : string {
        return this._id
    }

    get number() : number {
        return this._number
    }

    get dueDate() : Date {
        return this._dueDate
    }

    get amount() : number {
        return this._amount
    }
}