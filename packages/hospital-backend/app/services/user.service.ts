import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { Doctor, Patient } from 'app/entities'
import { Role } from '@jiangdonghan/common/model/userModel'
import Environment from '../../configs/environments'
import { UserLoginParams, UserRegisterParams } from '../controllers'
import { decryptPassword, encryptPassword } from '../utils'
import { HttpError } from 'routing-controllers'
import { DoctorInfo } from '../entities'

const jwt = require('jsonwebtoken')

interface FullDoctor extends Doctor {
  doctorInfo: DoctorInfo
  password: string
}
interface FullPatient extends Patient {
  password: string
}
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
      const doctorInfo = new DoctorInfo()
      const doctorId = await this.getNextDoctorId()
      user.id = doctorId
      doctorInfo.doctorId = doctorId
      user.doctorInfo = doctorInfo
    } else {
      throw new Error('Invalid role')
    }
    user.name = params.name
    user.email = params.email
    user.passwordHash = encryptPassword(params.password) || ''

    await user.save()
    return {
      ...user,
      password: decryptPassword(user.passwordHash),
      role: this.role,
      token: jwt.sign(
        {
          id: user.id,
          role: this.role,
          name: user.name,
          email: user.email,
          password: decryptPassword(user.passwordHash),
        },
        Environment.JWT_SECRET,
        { expiresIn: '60days' },
      ),
    }
  }

  async getNextDoctorId() {
    const doctor = await this.repository.findOne({
      order: {
        id: 'DESC',
      },
    })
    return doctor ? ++doctor.id : 1
  }

  /**
   * @deprecated
   * @param doctor
   */
  async prepareDoctorInfo(doctor: Doctor) {
    const repo = getRepository(DoctorInfo)
    const doctorInfo = await repo.findOne(doctor.id)
    if (doctorInfo) {
      return doctorInfo
    } else {
      const doctorInfo = new DoctorInfo()
      doctorInfo.doctorId = doctor.id
      await doctorInfo.save()
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
        password: decryptPassword(user.passwordHash),
        role: this.role,
        token: jwt.sign(
          {
            id: user.id,
            role: this.role,
            name: user.name,
            email: user.email,
            password: decryptPassword(user.passwordHash),
          },
          Environment.JWT_SECRET,
          { expiresIn: '60days' },
        ),
      }
    } else {
      throw new HttpError(400, 'Invalid username or password')
    }
  }

  async update(id: number, params: FullPatient | FullDoctor) {
    params.passwordHash = encryptPassword(params.password)
    const password = params.password
    delete params.password
    let data
    if (this.role === Role.DOCTOR) {
      data = await this.updateDoctor(id, params as FullDoctor)
    } else {
      data = await this.updatePatient(id, params as Patient)
    }

    return {
      token: jwt.sign(
        {
          ...data,
          password,
        },
        Environment.JWT_SECRET,
        { expiresIn: '60days' },
      ),
    }
  }

  async updateDoctor(id: number, params: FullDoctor) {
    const repo = getRepository(DoctorInfo)
    const doctorInfo = await repo.findOne({ doctorId: id })
    doctorInfo.specialty1 = params.doctorInfo.specialty1
    doctorInfo.clinicLocation = params.doctorInfo.clinicLocation
    doctorInfo.clinicName = params.doctorInfo.clinicName
    await doctorInfo.save()
    delete params.doctorInfo
    await this.repository.update(id, params)
    return {
      id: id,
      role: this.role,
      name: params.name,
      email: params.email,
      clinicLocation: doctorInfo.clinicLocation,
      clinicName: doctorInfo.clinicName,
      specialty1: doctorInfo.specialty1,
    }
  }

  async updatePatient(id: number, params: Patient) {
    await this.repository.update(id, params)
    return {
      id: id,
      role: this.role,
      name: params.name,
      email: params.email,
      sex: params.sex,
      age: params.age,
    }
  }
}
