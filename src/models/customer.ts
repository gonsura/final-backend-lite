import mongoose, { Document, Schema, Model } from 'mongoose'

const customerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    noTelp: { type: String, required: true },
    alamat: { type: String, required: true },
    nik: { type: String, required: true },
    orderedRoom: {
      kategory: { type: String, enum: ['gold', 'silver'], default: null },
      lantai: { type: Number, enum: [1, 2], default: null },
      noKamar: { type: Number, default: null },
      hargaKamar: { type: String, default: null },
    },
    check: {
      tanggalCheckIn: { type: Date, default: null },
      jumlahHari: { type: Number, default: null },
      tanggalCheckOut: { type: Date, default: null },
    },
  },
  { timestamps: true },
)

const customer: Model<CustomerDocument> = mongoose.model<CustomerDocument>('Customer', customerSchema)

interface Customer {
  name: string
  email: string
  noTelp: string
  alamat: string
  nik: string
  orderedRoom: {
    kategory: string | null
    lantai: number | null
    noKamar: number | null
    hargaKamar: string | null
  }
  check: {
    tanggalCheckIn: Date | null
    jumlahHari: number | null
    tanggalCheckOut: Date | null
  }
  autentication: {
    password: string
    salt: string | null
    sessionToken: string | null
  }
}

export type CustomerDocument = Customer & Document
export default customer
