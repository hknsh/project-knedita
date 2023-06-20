import jsonwebtoken from 'jsonwebtoken'
import prisma from '../../prisma/client.js'

function ensureAuthenticated (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.length === 0) {
    return res.status(401).json({
      error: 'Missing token'
    })
  }

  const token = req.headers.authorization.split(' ')[1]

  jsonwebtoken.verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({
        error: err.message
      })
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id
      }
    })

    if (!user) {
      return res.status(401).json({
        error: 'Invalid user'
      })
    }

    req.user = decoded

    return next()
  })
}

export default ensureAuthenticated
