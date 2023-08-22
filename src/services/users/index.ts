import userAuthService from './auth'
import userDeleteService from './delete'
import userFollowService from './follow-user'
import userFetchPostsService from './fetch-posts'
import userFetchInfoService from './fetch-info'
import userLikeCommentService from './like-comment'
import userLikePostService from './like-post'
import userSearchService from './search-user'
import userSignupService from './signup'
import userUpdateEmailService from './update-email'
import userUpdateNameService from './update-name'
import userUpdatePasswordService from './update-password'
import userUploadPictureService from './upload-picture'

const user = {
  auth: userAuthService,
  delete: userDeleteService,
  fetchInfo: userFetchInfoService,
  fetchPosts: userFetchPostsService,
  follow: userFollowService,
  likeComment: userLikeCommentService,
  likePost: userLikePostService,
  searchUser: userSearchService,
  signup: userSignupService,
  updateEmail: userUpdateEmailService,
  updateName: userUpdateNameService,
  updatePassword: userUpdatePasswordService,
  uploadPicture: userUploadPictureService
} as const

export default user
