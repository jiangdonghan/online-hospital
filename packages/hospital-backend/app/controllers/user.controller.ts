import { Body, Get, JsonController, Post, Put } from 'routing-controllers'
import { Role } from '../../../common/model/userModel'
import { UserService } from '../services'
import { IsEmail, IsEnum, MinLength } from 'class-validator'
import { DoctorInfo, Patient } from '../entities'
import { Doctor } from 'app/entities'

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

  @Put('/doctor/:id')
  async updateDoctorInfo(@Body() params: Doctor) {
    const userService = new UserService(Role.DOCTOR)
    return await userService.update(params)
  }

  @Put('/patient/:id')
  async updatePatientInfo(@Body() params: Patient) {
    const userService = new UserService(Role.PATIENT)
    return await userService.update(params)
  }
}
