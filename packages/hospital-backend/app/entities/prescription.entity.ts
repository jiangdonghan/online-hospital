import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('prescription')
export class Prescription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  doctorId: number

  @Column()
  patientId: number

  @Column()
  appointmentId: number

  @Column()
  symptom: string

  @Column()
  advice: string

  @Column()
  diagnosis: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
