import postCreateController from './create'
import postDeleteController from './delete'
import postFetchInfoController from './fetch-info'
import postUpdateController from './update'
import postFetchLikesController from './fetch-likes'

const post = {
  create: postCreateController,
  delete: postDeleteController,
  fetch: postFetchInfoController,
  fetchLikes: postFetchLikesController,
  update: postUpdateController
} as const

export default post
