import type { HttpContext } from '@adonisjs/core/http'
import { logValidator } from '../../validators/log.js'
import Log from '#models/log'

export default class LogsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const logs = await Log.all()
    logs.forEach((log) => {
      log.createdAt = log.createdAt.toLocaleString()
    })
    return { logs }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(logValidator)
    const log = await Log.create(data)
    return { message: 'Log created successfully', log }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    console.log(params.id)
    console.log(params.category)
    // find log by category and user_id
    const logs = await Log.query().where('category', params.category).where('user_id', params.id)
    //format date of createdAt
    logs.forEach((log) => {
      log.createdAt = log.createdAt.toLocaleString()
    })
    return { logs }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
