import userSignupService from '../services/user-signup.js'

async function userSignupController (req, res) {
  const { username, email, password } = req.body

  const result = await userSignupService({ username, email, password })

  if (result instanceof Error) {
    return res.status(400).json({
      error: result.message
    })
  }

  return res.json(result)
}

export default userSignupController
