import userAuthService from './users/auth'
import userDeleteService from './users/delete'
import userFollowService from './users/follow-user'
import userFetchPostsService from './users/fetch-posts'
import userFetchInfoService from './users/fetch-info'
import userLikePostService from './users/like-post'
import userSearchService from './users/search-user'
import userSignupService from './users/signup'
import userUpdateService from './users/update'
import userUploadPictureService from './users/upload-picture'

import postCreateService from './posts/create'
import postDeleteService from './posts/delete'
import postFetchInfoService from './posts/fetch-info'
import postFetchLikesService from './posts/fetch-likes'
import postUpdateService from './posts/update'

import commentCreateService from './comments/create'
import commentDeleteService from './comments/delete'
import commentFetchService from './comments/fetch'
import commentUpdateService from './comments/update'

// User services
const user = {
  auth: userAuthService,
  delete: userDeleteService,
  fetchInfo: userFetchInfoService,
  signup: userSignupService,
  update: userUpdateService,
  uploadPicture: userUploadPictureService,
  likePost: userLikePostService,
  follow: userFollowService,
  fetchPosts: userFetchPostsService,
  searchUser: userSearchService
}

// Post services
const post = {
  create: postCreateService,
  delete: postDeleteService,
  info: postFetchInfoService,
  update: postUpdateService,
  fetchLikes: postFetchLikesService
}

// Comment services
const comment = {
  create: commentCreateService,
  delete: commentDeleteService,
  fetch: commentFetchService,
  update: commentUpdateService
}

export { user, post, comment }
