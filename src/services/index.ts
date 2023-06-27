import userAuthService from './users/user-auth'
import userDeleteService from './users/user-delete'
import userInfoService from './users/user-info'
import userSignupService from './users/user-signup'
import userUpdateService from './users/user-update'

import postCreateService from './posts/post-create'
import postDeleteService from './posts/post-delete'
import postInfoService from './posts/post-info'
import postUpdateService from './posts/post-update'

// User services
const user = {
  auth: userAuthService,
  delete: userDeleteService,
  info: userInfoService,
  signup: userSignupService,
  update: userUpdateService
}

// Post services
const post = {
  create: postCreateService,
  delete: postDeleteService,
  info: postInfoService,
  update: postUpdateService
}

export { user, post }
