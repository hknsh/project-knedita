import userAuthService from './users/auth'
import userDeleteService from './users/delete'
import userFollowService from './users/follow-user'
import userInfoService from './users/get-info'
import userLikePostService from './users/like-post'
import userSignupService from './users/signup'
import userUpdateService from './users/update'
import userUploadPictureService from './users/upload-picture'

import postCreateService from './posts/create'
import postDeleteService from './posts/delete'
import postInfoService from './posts/get-info'
import postUpdateService from './posts/update'

// User services
const user = {
  auth: userAuthService,
  delete: userDeleteService,
  info: userInfoService,
  signup: userSignupService,
  update: userUpdateService,
  uploadPicture: userUploadPictureService,
  likePost: userLikePostService,
  follow: userFollowService
}

// Post services
const post = {
  create: postCreateService,
  delete: postDeleteService,
  info: postInfoService,
  update: postUpdateService
}

export { user, post }
