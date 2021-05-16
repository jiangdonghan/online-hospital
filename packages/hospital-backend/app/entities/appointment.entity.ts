import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
}
