import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { Doctor, Patient } from 'app/entities'
import { Role } from '../../../common/model/userModel'
import Environment from '../../configs/environments'
import { UserLoginParams, UserRegisterParams } from '../controllers'
import { encryptPassword } from '../utils'
import { HttpError } from 'routing-controllers'

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

  async create(params: UserRegisterParams) {
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
    user.passwordHash = encryptPassword(params.password) || ''
    await user.save()
    return {
      ...user,
      role: this.role,
      token: jwt.sign(
        { role: this.role, name: user.name, email: user.email },
        Environment.JWT_SECRET,
        { expiresIn: '60days' },
      ),
    }
  }

  async login(params: UserLoginParams) {
    let user = await this.repository.findOne({
      email: params.email,
      passwordHash: encryptPassword(params.password),
    })

    if (user) {
      return {
        ...user,
        role: this.role,
        token: jwt.sign(
          { role: this.role, name: user.name, email: user.email },
          Environment.JWT_SECRET,
          { expiresIn: '60days' },
        ),
      }
    } else {
      throw new HttpError(400, 'Invalid username or password')
    }
  }
}
