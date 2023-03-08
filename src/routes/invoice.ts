import express from "express";
import controller from "../controllers/Invoice"

const router = express.Router();

router.post('/create/', controller.createInvoice)
router.get('/get/:invoiceId', controller.readInvoice)
router.get('/get/', controller.readAllInvoices)
router.patch('/update/:invoiceId', controller.updateInvoice)
router.delete('/delete/:invoiceId', controller.deleteInvoice)

export = router