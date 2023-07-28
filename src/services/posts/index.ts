import postCreateService from './create'
import postDeleteService from './delete'
import postFetchInfoService from './fetch-info'
import postFetchLikesService from './fetch-likes'
import postUpdateService from './update'

const post = {
  create: postCreateService,
  delete: postDeleteService,
  fetch: postFetchInfoService,
  fetchLikes: postFetchLikesService,
  update: postUpdateService
}

export default post
