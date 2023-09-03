import userAuthController from './auth'
import userDeleteController from './delete'
import userFollowController from './follow-user'
import userFetchInfoController from './fetch-info'
import userFetchPostsController from './fetch-posts'
import userLikeCommentController from './like-comment'
import userLikePostController from './like-post'
import userSearchController from './search-user'
import userSignupController from './signup'
import userUpdateEmailController from './update-email'
import userUpdateNameController from './update-name'
import userUpdatePasswordController from './update-password'
import userUploadPictureController from './upload-picture'

const user = {
  auth: userAuthController,
  delete: userDeleteController,
  fetchInfo: userFetchInfoController,
  fetchPosts: userFetchPostsController,
  follow: userFollowController,
  likeComment: userLikeCommentController,
  likePost: userLikePostController,
  searchUser: userSearchController,
  signup: userSignupController,
  updateEmail: userUpdateEmailController,
  updateName: userUpdateNameController,
  updatePassword: userUpdatePasswordController,
  uploadPicture: userUploadPictureController,
} as const

export default user
