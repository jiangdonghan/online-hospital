import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { Doctor, Patient } from 'app/entities'
import { Role } from '../../../common/model/userModel'
import Environment from '../../configs/environments'

const jwt = require('jsonwebtoken')

@Service()
export class UserService {
  repository: Repository<Patient | Doctor>
  role: Role
  constructor(role: Role) {
    this.role = role
    if (role === Role.DOCTOR) {
      this.repository = getRepository(Doctor)
    }
    if (role === Role.PATIENT) {
      this.repository = getRepository(Patient)
    }
  }

  async create(params: Doctor | Patient) {
    let user = null
    if (this.role === Role.PATIENT) {
      user = new Patient()
    } else if (this.role === Role.DOCTOR) {
      user = new Doctor()
    } else {
      throw new Error('Invalid role')
    }
    user.name = params.name
    user.email = params.email
    user.passwordHash = params.passwordHash || ''
    await user.save()
    return {
      ...user,
      token: jwt.sign(
        { role: this.role, name: user.name, email: user.email },
        Environment.JWT_SECRET,
        { expiresIn: '60days' },
      ),
    }
  }
}
