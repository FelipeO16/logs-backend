import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '../../../validators/auth.js'
import env from '#start/env'
import User from '#models/user'

export default class RegisterController {
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    if (data.token === env.get('REGISTER_TOKEN')) {
      delete (data as { token?: string }).token
      const user = await User.create(data)
      return user
    }
    throw new Error('Invalid token')
  }
}
