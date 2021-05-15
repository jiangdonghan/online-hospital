import {
  Body,
  Get,
  JsonController,
  Param,
  Params,
  Post,
  Put,
  UploadedFile,
} from 'routing-controllers'
import { Role } from '../../../common/model'
import { UserService } from '../services'
import { IsEmail, IsEnum, MinLength } from 'class-validator'
import { DoctorInfo, Patient } from '../entities'
import { Doctor } from 'app/entities'
import * as fs from 'fs'
import { Buffer } from 'buffer'
import { getRepository } from 'typeorm'
import { writeFile } from '../utils'
export class UserRegisterParams {
  @MinLength(3, { message: 'Name is too short' })
  name: string

  @IsEnum(Role)
  role: Role

  @MinLength(6, { message: 'Password is too short' })
  password: string

  @IsEmail()
  email: string
}

export class UserLoginParams {
  @IsEnum(Role)
  role: Role

  @MinLength(6, { message: 'Password is too short' })
  password: string

  @IsEmail()
  email: string
}

@JsonController()
export class UserController {
  constructor() {}

  @Post('/register')
  async register(@Body() params: UserRegisterParams) {
    const userService = new UserService(params.role)
    return await userService.create(params)
  }

  @Post('/login')
  async login(@Body() params: UserLoginParams) {
    const userService = new UserService(params.role)
    return await userService.login(params)
  }

  @Get('/me/role/:role/id/:id')
  async getNewToken(@Params() { id, role }: { id: number; role: Role }) {
    const userService = new UserService(role)
    return await userService.getLatestToken(id)
  }

  @Put('/doctor/:id')
  async updateDoctorInfo(
    @Param('id') id: number,
    @Body() params: Doctor & { password: string },
  ) {
    const userService = new UserService(Role.DOCTOR)
    return await userService.update(id, params)
  }

  @Put('/patient/:id')
  async updatePatientInfo(
    @Param('id') id: number,
    @Body() params: Patient & { password: string },
  ) {
    const userService = new UserService(Role.PATIENT)
    return await userService.update(id, params)
  }

  @Post('/avatar/doctor/:id')
  async uploadDoctorAvatar(@Param('id') id: number, @UploadedFile('image') file: any) {
    const type = file.originalname.split('.').pop()
    const name = `doctor${id}.${type}`
    writeFile(name, file.buffer)
    const repo = getRepository(Doctor)
    const doctor = await repo.findOne(id)
    doctor.avatar = name
    await doctor.save()
    return { image: doctor.avatar }
  }

  @Post('/avatar/patient/:id')
  async uploadPatientAvatar(@Param('id') id: number, @UploadedFile('image') file: any) {
    const type = file.originalname.split('.').pop()
    const name = `patient${id}.${type}`
    writeFile(name, file.buffer)
    const repo = getRepository(Patient)
    const patient = await repo.findOne(id)
    patient.avatar = name
    await patient.save()
    return { image: patient.avatar }
  }

  @Post('/avatar/doctor/:id/certification')
  async uploadCertificate(@Param('id') id: number, @UploadedFile('image') file: any) {
    const type = file.originalname.split('.').pop()
    const name = `certification${id}.${type}`
    writeFile(name, file.buffer)
    const repo = getRepository(DoctorInfo)
    const doctorInfo = await repo.findOne({ doctorId: id })
    doctorInfo.certification = name
    await doctorInfo.save()
    return { image: doctorInfo.certification }
  }

  @Get('/doctors')
  async getAllDoctors() {
    const repo = getRepository(Doctor)
    const result = await repo.findAndCount()
    return result[0]
  }
}
