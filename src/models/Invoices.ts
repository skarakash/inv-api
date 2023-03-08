import mongoose, {Document, Schema} from "mongoose";

export interface IInvoice {
    id: string,
    createdAt: string,
    paymentDue: string,
    description: string,
    paymentTerms: number,
    clientName: string,
    clientEmail: string,
    status: string,
    senderAddress: {
        street: string,
        city: string,
        postCode: string,
        country: string
    },
    clientAddress: {
        street: string,
        city: string,
        postCode: string,
        country: string
    },
    items: [
        {
            name: string,
            quantity: number,
            price: number,
            total: number
        }
    ],
    total: number
}

export interface IInvoiceModel extends IInvoice, Document {
    id: string;
}

const InvoiceSchema: Schema = new Schema(
    {
        id: {type: String, required: true},
        createdAt: {type: String, required: true},
        paymentDue: {type: String, required: true},
        description: {type: String, required: true},
        paymentTerms:{type: String, required: true},
        clientName:{type: String, required: true},
        clientEmail:{type: String, required: true},
        status:{type: String, required: true},
        senderAddress: {
            street: {type: String, required: true},
            city: {type: String, required: true},
            postCode: {type: String, required: true},
            country: {type: String, required: true}
        },
        clientAddress: {
            street: {type: String, required: true},
            city: {type: String, required: true},
            postCode: {type: String, required: true},
            country: {type: String, required: true},
        },
        items: [
            {
                name: {type: String, required: true},
                quantity: {type: Number, required: true},
                price: {type: String, required: true},
                total: {type: String, required: true}
            }
        ],
        total:  {type: Number, required: true},
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IInvoiceModel>('Invoice', InvoiceSchema)