import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

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
  isValid: boolean

  @Column()
  isOnline: boolean

  @Column()
  deleted: boolean

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
