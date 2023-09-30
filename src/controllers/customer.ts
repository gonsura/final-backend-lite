import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import Customer from '../models/customer'
import moment from 'moment'

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

    const remapCustomer = {
      id: customer?._id,
      name: customer?.name,
      email: customer?.email,
      noTelp: customer?.noTelp,
      alamat: customer?.alamat,
      nik: customer?.nik,
      kategory: customer?.orderedRoom.kategory,
      lantai: customer?.orderedRoom.lantai,
      noKamar: customer?.orderedRoom.noKamar,
      hargaKamar: customer?.orderedRoom.hargaKamar,
      tanggalCheckIn: new Date(customer?.check.tanggalCheckIn || '').toLocaleDateString(),
      jamCheckIn: new Date(customer?.check.tanggalCheckIn || '').toLocaleTimeString(),
      jumlahHari: customer?.check.jumlahHari,
      tanggalCheckOut: new Date(customer?.check.tanggalCheckOut || '').toLocaleDateString(),
      jamCheckOut: new Date(customer?.check.tanggalCheckOut || '').toLocaleTimeString(),
    }
    return customer ? res.status(200).json({ remapCustomer }) : res.status(404).json({ message: 'customer not found' })
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

export const readAllCustomerCheckOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await Customer.find()
    const filterCustomers = customers
      .map((customer) => {
        return {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          noTelp: customer.noTelp,
          alamat: customer.alamat,
          nik: customer.nik,
          kategory: customer.orderedRoom.kategory,
          lantai: customer.orderedRoom.lantai,
          noKamar: customer.orderedRoom.noKamar,
          hargaKamar: customer.orderedRoom.hargaKamar,
          tanggalCheckIn: new Date(customer.check.tanggalCheckIn || '').toLocaleDateString(),
          jamCheckIn: new Date(customer.check.tanggalCheckIn || '').toLocaleTimeString(),
          jumlahHari: customer.check.jumlahHari,
          tanggalCheckOut: new Date(customer.check.tanggalCheckOut || '').toLocaleDateString(),
          jamCheckOut: new Date(customer.check.tanggalCheckOut || '').toLocaleTimeString(),
        }
      })
      .filter((customer) => {
        const dateNowArr = new Date().toLocaleDateString()
        return moment(dateNowArr).isSameOrAfter(customer.tanggalCheckIn)
      })
    return res.status(200).json({ filterCustomers })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res.status(500).json({ message: 'unknow error' })
  }
}
export const readAllCustomerNotCheckOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await Customer.find()
    const filterCustomers = customers
      .map((customer) => {
        return {
          id: customer._id,
          name: customer.name,
          email: customer.email,
          noTelp: customer.noTelp,
          alamat: customer.alamat,
          nik: customer.nik,
          kategory: customer.orderedRoom.kategory,
          lantai: customer.orderedRoom.lantai,
          noKamar: customer.orderedRoom.noKamar,
          hargaKamar: customer.orderedRoom.hargaKamar,
          tanggalCheckIn: new Date(customer.check.tanggalCheckIn || '').toLocaleDateString(),
          jamCheckIn: new Date(customer.check.tanggalCheckIn || '').toLocaleTimeString(),
          jumlahHari: customer.check.jumlahHari,
          tanggalCheckOut: new Date(customer.check.tanggalCheckOut || '').toLocaleDateString(),
          jamCheckOut: new Date(customer.check.tanggalCheckOut || '').toLocaleTimeString(),
        }
      })
      .filter((customer) => {
        const dateNowArr = new Date().toLocaleDateString()
        return moment(dateNowArr).isBefore(customer.tanggalCheckIn)
      })
    return res.status(200).json({ filterCustomers })
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
    const {
      name,
      email,
      noTelp,
      alamat,
      nik,
      tanggalCheckIn,
      jamCheckIn,
      jumlahHari,
      tanggalCheckOut,
      jamCheckOut,
      kategory,
      lantai,
      noKamar,
      hargaKamar,
    } = req.body
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
        hargaKamar,
      },
      check: {
        tanggalCheckIn: moment(`${tanggalCheckIn} ${jamCheckIn}`).toDate(),
        jumlahHari,
        tanggalCheckOut : moment(`${tanggalCheckOut} ${jamCheckOut}`).toDate(),
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
