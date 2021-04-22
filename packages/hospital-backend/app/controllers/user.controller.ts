import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers'
import { Doctor, Patient } from '../entities'
import { getRepository } from 'typeorm'
import { Role } from '../../../common/model/userModel'
import Environment from '../../configs/environments'
import { UserService } from '../services'

@JsonController()
export class UserController {
  constructor() {}
  @Post('/users')
  async post(@Body() params: Patient) {
    let user = new Patient()
    user.name = params.name
    user.email = params.email
    user.passwordHash = params.passwordHash || ''
    await user.save()
    return user
  }

  @Post('/register')
  async register(@Body() params: Patient | Doctor, @QueryParam('role') role: Role) {
    const userService = new UserService(role)
    return userService.create(params)
  }

  @Get('/users')
  async getUsers(@QueryParam('pageSize') pageSize: number) {
    const entities = getRepository(Patient)
    const result = await entities.findAndCount()
    return { elements: result[0], count: result[1] }
  }
}
const a = new UserController()
