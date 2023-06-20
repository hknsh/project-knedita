import userInfoService from '../services/user-info.js'

async function userInfoController (req, res) {
  const result = await userInfoService(req)

  if (result instanceof Error) {
    return res.status(400).json({
      error: result.message
    })
  }

  res.json(result)
}

export default userInfoController
