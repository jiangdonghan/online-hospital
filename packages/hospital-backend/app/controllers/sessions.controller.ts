import { Get, JsonController, QueryParams } from 'routing-controllers'
import Environment from 'configs/environments'
import { Role } from '@jiangdonghan/common/model/userModel'
import { IsEnum, MinLength } from 'class-validator'
class GetUsersQuery {
  @MinLength(3, { message: 'Name is too short' })
  name: string

  @IsEnum(Role)
  role: Role

  email: string
}
@JsonController()
export class SessionsController {
  constructor() {}
  @Get('/sessions')
  async session(@QueryParams() query: GetUsersQuery): Promise<any> {
    return `hello on ${Environment.identity} (${query.name}) (${query.email}) (${query.role})`
  }
}
