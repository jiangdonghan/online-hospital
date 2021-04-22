import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

/**
 * All validator can be applied to all controllers.
 * Reference document: https://github.com/typestack/class-validator
 * How to auto validaing? see: https://github.com/typestack/routing-controllers#auto-validating-action-params
 */

@Entity('patient')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  deleted: boolean

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
