import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { PrescriptionModel } from '../services'
import { Prescription } from './prescription.entity'

@Entity('appointment')
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  doctorId: number

  @Column()
  patientId: number

  @Column()
  status: number

  @Column()
  appointmentTs: string

  @Column()
  startTs: string

  @Column()
  endTs: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  async savePrescription(params: PrescriptionModel) {
    const prescription = await Prescription.findOne({ where: { appointmentId: this.id } })
    prescription.diagnosis = params.diagnosis
    prescription.symptom = params.symptom
    prescription.advice = params.advice
    await prescription.save()
    return prescription
  }

  async preparePrescription() {
    const prescription = await Prescription.findOne({ where: { appointmentId: this.id } })
    if (!prescription) {
      const newPrescription = new Prescription()
      newPrescription.doctorId = this.doctorId
      newPrescription.patientId = this.patientId
      newPrescription.appointmentId = this.id
      await newPrescription.save()
      await newPrescription.reload()
      return newPrescription
    }
    return prescription
  }
}
