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
const users = {
  userAuth: userAuthService,
  userDelete: userDeleteService,
  userInfo: userInfoService,
  userSignup: userSignupService,
  userUpdate: userUpdateService
}

// Post services
const posts = {
  postCreate: postCreateService,
  postDelete: postDeleteService,
  postInfo: postInfoService,
  postUpdate: postUpdateService
}

export { users, posts }
