import userAuthService from './auth'
import userDeleteService from './delete'
import userFollowService from './follow-user'
import userFetchPostsService from './fetch-posts'
import userFetchInfoService from './fetch-info'
import userLikeCommentService from './like-comment'
import userLikePostService from './like-post'
import userSearchService from './search-user'
import userSignupService from './signup'
import userUpdateService from './update'
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
  update: userUpdateService,
  uploadPicture: userUploadPictureService
}

export default user
