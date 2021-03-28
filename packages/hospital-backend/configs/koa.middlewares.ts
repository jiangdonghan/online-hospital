import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Environment from './environments'
const onerror = require('koa-onerror')
export const useMiddlewares = <T extends Koa>(app: T): T => {
  Environment.identity !== 'test' && app.use(logger())

  app.use(bodyParser())

  onerror(app)
  app.on('error', (err, ctx) => {
    console.error('server', err, ctx)
  })

  app.use(async (ctx, next) => {
    await next()
    if (ctx.status !== 200) {
      console.log(ctx.response)
      throw new Error(ctx.message)
    }
  })

  return app
}
