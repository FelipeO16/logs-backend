import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    /**
     * Find a user by email. Return error if a user does
     * not exists
     */
    const user = await User.findBy('email', email)
    if (!user) {
      response.abort('Invalid credentials')
    }
    const data = user ? await hash.verify(user.password, password) : false
    if (!data) {
      response.abort('Invalid credentials')
    }
    const token = user ? await User.accessTokens.create(user) : false
    /**
     * Verify the password using the hash service
     */

    /**
     * Now login the user or create a token for them
     */

    return {
      success: true,
      user: user?.serialize(),
      token: token !== false ? token.value!.release() : null,
    }
  }

}
