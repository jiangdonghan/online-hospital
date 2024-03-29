import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class HeaderMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => any): Promise<any> {
    context.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    context.set('Access-Control-Allow-Origin', '*')
    context.set('Access-Control-Allow-Headers', '*')
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', '*')

    return next()
  }
}
