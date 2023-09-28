import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Customer from '../models/customer'

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, noTelp, alamat, nik, orderedRoom, check } = req.body
    const customer = new Customer({
      name,
      email,
      noTelp,
      alamat,
      nik,
      orderedRoom,
      check,
    })
    const newCustomer = await customer.save()
    res.status(201).json({ newCustomer })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
export const readCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const customer = await Customer.findById(id)
    return customer ? res.status(200).json({ customer }) : res.status(404).json({ message: 'customer not found' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
export const readAllCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await Customer.find()
    return res.status(200).json({ customers })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { name, email, noTelp, alamat, nik, orderedRoom, check } = req.body
    const {kategory, lantai, noKamar, hargaKamar } = orderedRoom
    const { tanggalCheckIn, jumlahHari, tanggalCheckOut } = check
    const customer = await Customer.findByIdAndUpdate(id, {
      name,
      email,
      noTelp,
      alamat,
      nik,
      orderedRoom: {
        kategory,
        lantai,
        noKamar,
        hargaKamar
      },
      check: {
        tanggalCheckIn,
        jumlahHari,
        tanggalCheckOut
      },
    })
    return customer ? res.status(200).json({ customer }) : res.status(404).json({ message: 'customer not found' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const customer = await Customer.findByIdAndDelete(id)
    return customer ? res.status(200).json({ customer }) : res.status(404).json({ message: 'customer not found' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
