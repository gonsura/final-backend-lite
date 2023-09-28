import Joi, {ObjectSchema} from 'joi'
import { NextFunction, Request, Response } from 'express'
import Logging from '../library/Logging'


export const validateShema = (schema: ObjectSchema) => {
    return  async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body)
            next()
            next()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message }) 
            }
        }
    }
}


export const Schemas = {
    createCustomer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        noTelp: Joi.string().required(),
        alamat: Joi.string().required(),
        nik: Joi.string().required(),
        orderedRoom: Joi.object({
            kategory: Joi.string().valid('silver', 'gold').required(),
            lantai: Joi.string().valid('1', '2').required(),
            noKamar: Joi.string().regex(/^[12]\d{2}$/).required(),
            hargaKamar: Joi.string().regex(/^Rp\s\d{1,3}(\.\d{3})*(,\d+)?$/).required(),
        }).required(),
        check: Joi.object({
            tanggalCheckIn: Joi.date().required(),
            jumlahHari: Joi.string().required(),
            tanggalCheckOut: Joi.date().required(),
        }).required(),
    }),
    updateCustomer: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        noTelp: Joi.string().required(),
        alamat: Joi.string().required(),
        nik: Joi.string().required(),
        orderedRoom: Joi.object({
            kategory: Joi.string().valid('silver', 'gold').required(),
            lantai: Joi.string().valid('1', '2').required(),
            noKamar: Joi.string().regex(/^[12]\d{2}$/).required(),
            hargaKamar: Joi.string().regex(/^Rp\s\d{1,3}(\.\d{3})*(,\d+)?$/).required(),
        }).required(),
        check: Joi.object({
            tanggalCheckIn: Joi.date().required(),
            jumlahHari: Joi.string().required(),
            tanggalCheckOut: Joi.date().required(),
        }).required(),
    })
}