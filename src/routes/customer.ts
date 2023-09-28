import express from 'express'
import { createCustomer, deleteCustomer, readAllCustomer, readCustomer, updateCustomer } from '../controllers/customer'
import {validateShema, Schemas} from '../middleware/validateShema'

const router = express.Router()

router.post('/create', validateShema(Schemas.createCustomer), createCustomer)
router.get('/get/:id', readCustomer)
router.get('/get', readAllCustomer)
router.patch('/update/:id', validateShema(Schemas.updateCustomer), updateCustomer)
router.delete('/delete/:id', deleteCustomer)


export default router