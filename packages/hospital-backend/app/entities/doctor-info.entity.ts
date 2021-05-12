import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { Doctor } from './doctor.entity'

@Entity('doctor_info')
export class DoctorInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  doctorId: number

  @Column()
  clinicName: string

  @Column()
  clinicLocation: string

  @Column()
  certification: string

  @Column()
  specialty1: string

  @Column()
  specialty2: string

  @Column()
  specialty3: string

  @Column()
  introduction: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @OneToOne(type => Doctor, doctor => doctor.id)
  doctor: Doctor
}
