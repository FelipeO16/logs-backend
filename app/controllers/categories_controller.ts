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
    return { categories: categoriesObject }
  }
}
