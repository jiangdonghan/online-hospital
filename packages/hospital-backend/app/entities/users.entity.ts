import { MinLength, IsNotEmpty } from 'class-validator'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

/**
 * All validator can be applied to all controllers.
 * Reference document: https://github.com/typestack/class-validator
 * How to auto validaing? see: https://github.com/typestack/routing-controllers#auto-validating-action-params
 */

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  role: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
