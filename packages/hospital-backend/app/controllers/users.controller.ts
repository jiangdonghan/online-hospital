import { Body, Get, JsonController, Post, QueryParam } from 'routing-controllers'
import { User } from '../entities'
import { getManager } from 'typeorm'
@JsonController()
export class UsersController {
  constructor() {}
  @Post('/users')
  async post(@Body() params: User) {
    let user = new User()
    user.name = params.name
    user.email = params.email
    user.passwordHash = params.passwordHash || ''
    await user.save()
    return user
  }

  @Get('/users')
  async getUsers(@QueryParam('pageSize') pageSize: number) {
    console.log('pageSize:', pageSize)
    const entities = getManager()
    console.log('aaaaaaaaa')
    const result = await entities.findAndCount(User)
    return { elements: result[0], count: result[1] }
  }
}
