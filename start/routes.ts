/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import User from '#models/user'
const SessionController = () => import('#controllers/session_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('login', [SessionController, 'store'])

router.get('posts', () => {
  return {
    success: true,
  }
}).use([middleware.auth()])


router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
})

router.group(() => {
  router.post('/register', [RegisterController, 'store'])
})

// router.post('logs', async ({ auth }) => {
//   // Authenticate using the default guard
//   const user = await auth.authenticate()

//   // Authenticate using a named guard
//   const user = await auth.authenticateUsing(['api'])
// })
