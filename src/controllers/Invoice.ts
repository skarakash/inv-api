import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import Invoice from "../models/Invoices";

const createInvoice = (req: Request, res: Response, next: NextFunction) => {
    const newInvoice = req.body;

    const invoice = new Invoice({
        _id: new mongoose.Types.ObjectId(),
        ...newInvoice
    });

    return invoice.save()
        .then((invoice) => res.status(201).json({invoice}))
        .catch((error) => res.status(500).json({error}))
}

const readInvoice = (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.invoiceId;

    return Invoice.findById(invoiceId)
        .then(invoice => invoice ? res.status(200).json(invoice) : res.status(404).json({message: 'Not found'}))
        .catch((error) => res.status(500).json({error}))
}

const readAllInvoices = (req: Request, res: Response, next: NextFunction) => {
    return Invoice.find()
        .then(invoices => res.status(200).json(invoices))
        .catch((error) => res.status(500).json({error}))
}

const updateInvoice = (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.invoiceId;

    return Invoice.findById(invoiceId)
        .then(invoice => {
            if (invoice) {
                invoice.set(req.body)

                return invoice.save()
                    .then((invoice) => res.status(201).json({invoice}))
                    .catch((error) => res.status(500).json({error}))
            } else {
                res.status(404).json({message: "Not found"})
            }
        })
        .catch((error) => res.status(500).json({error}))
}

const deleteInvoice = (req: Request, res: Response, next: NextFunction) => {
    const invoiceId = req.params.invoiceId;

    return Invoice.findByIdAndDelete(invoiceId)
        .then(invoice => invoice ? res.status(200).json(invoice) : res.status(404).json({message: 'Not found'}))
        .catch((error) => res.status(500).json({error}))
}

export default { readInvoice, readAllInvoices, updateInvoice, deleteInvoice, createInvoice }