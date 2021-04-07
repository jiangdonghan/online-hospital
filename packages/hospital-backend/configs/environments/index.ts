import development from './development'
import production from './production'
const isProd = process.env.NODE_ENV === 'production'
const env = isProd ? production : development

// Preference of environmental variables.
Object.keys(env).forEach(key => {
  env[key] = process.env[key] || env[key]
})
// Object.keys(parsedEnvs || {}).forEach(key => {
//   env[key] = parsedEnvs[key]
// })

const Environment = env

export default Environment
