import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { DoctorInfo } from './doctor-info.entity'

@Entity('doctor')
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  avatar: string

  @Column()
  isValid: boolean

  @Column()
  isOnline: boolean

  @Column()
  deleted: boolean

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @OneToOne(type => DoctorInfo, doctorInfo => doctorInfo.doctorId, {
    cascade: true,
  })
  doctorInfo: DoctorInfo
}
