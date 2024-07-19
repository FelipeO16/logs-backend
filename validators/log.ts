import vine from '@vinejs/vine'

export const logValidator = vine.compile(
  vine.object({
    user_id: vine.number().positive(),
    category: vine.string().maxLength(100),
    action: vine.string(),
    token: vine.string().maxLength(100),
  })
)
