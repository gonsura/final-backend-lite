import express from 'express'
import { createCustomer, deleteCustomer, readAllCustomer, readCustomer, updateCustomer, readAllCustomerCheckOut, readAllCustomerNotCheckOut } from '../controllers/customer'
import {validateShema, Schemas} from '../middleware/validateShema'

const router = express.Router()

router.post('/create', validateShema(Schemas.createCustomer), createCustomer)
router.get('/get/:id', readCustomer)
router.get('/check-out', readAllCustomerCheckOut)
router.get('/not-check-out', readAllCustomerNotCheckOut)
router.get('/get', readAllCustomer)
router.patch('/update/:id', validateShema(Schemas.updateCustomer), updateCustomer)
router.delete('/delete/:id', deleteCustomer)


export default router