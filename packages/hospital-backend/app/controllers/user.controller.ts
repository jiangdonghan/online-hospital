import { Body, Get, JsonController, Post, QueryParams } from 'routing-controllers'
import { Role } from '../../../common/model/userModel'
import { UserService } from '../services'
import { IsEmail, IsEnum, MinLength } from 'class-validator'

export class UserRegisterParams {
  @MinLength(3, { message: 'Name is too short' })
  name: string

  @IsEnum(Role)
  role: Role

  @MinLength(6, { message: 'Password is too short' })
  passwordHash: string

  @IsEmail()
  email: string
}

export class UserLoginParams {
  @IsEnum(Role)
  role: Role

  @MinLength(6, { message: 'Password is too short' })
  passwordHash: string

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

  @Get('/login')
  async login(@QueryParams() params: UserLoginParams) {
    const userService = new UserService(params.role)
    return await userService.login(params)
  }
}
