import userAuthService from '../services/user-auth.js'

async function userAuthController (req, res) {
  const { email, password } = req.body

  const result = await userAuthService({ email, password })

  if (result instanceof Error) {
    return res.status(400).json({
      error: result.message
    })
  }

  res.json(result)
}

export default userAuthController
