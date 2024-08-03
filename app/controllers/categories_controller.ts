import type { HttpContext } from '@adonisjs/core/http'
import Log from '#models/log'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const logs = await Log.all()
    const categories = logs.map((log) => log.category)
    const uniqueCategories = [...new Set(categories)]

    const categoriesObject = uniqueCategories.map((category) => ({
      name: category,
      label: category,
    }))

    console.log(categoriesObject)
    return { categories: categoriesObject }
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

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
