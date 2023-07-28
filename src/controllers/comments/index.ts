import commentCreateController from './create'
import commentDeleteController from './delete'
import commentFetchController from './fetch-info'
import commentFetchLikesController from './fetch-likes'
import commentUpdateController from './update'

const comments = {
  create: commentCreateController,
  delete: commentDeleteController,
  fetch: commentFetchController,
  fetchLikes: commentFetchLikesController,
  update: commentUpdateController
}

export default comments
