import * as entities from 'app/entities'
import * as bootstrap from './bootstrap'
import { print } from './utils'
import { createConnection } from 'typeorm'

const connectionOptions = require('ormconfig')
;(async () => {
  const connection = await createConnection({
    ...connectionOptions,
    entities: Object.keys(entities).map(name => entities[name]),
  })
  if (connection.isConnected) {
    print.log('database connected.')
  } else {
    print.danger('Database connection failed.')
  }

  bootstrap.connected()
})().catch(error => console.log(error))
