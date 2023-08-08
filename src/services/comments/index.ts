import commentCreateService from './create'
import commentDeleteService from './delete'
import commentFetchService from './fetch-info'
import commentFetchLikesService from './fetch-likes'
import commentUpdateService from './update'

const comment = {
  create: commentCreateService,
  delete: commentDeleteService,
  fetch: commentFetchService,
  fetchLikes: commentFetchLikesService,
  update: commentUpdateService
} as const

export default comment
