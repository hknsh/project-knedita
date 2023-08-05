interface User {
  id?: string
  displayName?: string | null
  username?: string
  email?: string
  password?: string
  profileImage?: string | null
  createdAt?: Date
  token?: string
  socketId?: string
}

export default User
