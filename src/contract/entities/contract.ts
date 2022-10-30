import { Installment } from "./installment"

export class Contract {
    constructor(
        private _id: string,
        private _number: string,
        private _date: Date,
        private _installments: Array<Installment>
    ) {}
    
    get id() : string {
        return this._id
    }
    
    get number() : string {
        return this._number
    }

    get date() : Date {
        return this._date
    }

    get installments(): Array<Installment> {
        return this._installments
    }
}