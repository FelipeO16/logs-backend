import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '../../../validators/auth.js'
import User from '#models/user'

export default class RegisterController {
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)
    return user
  }
}
