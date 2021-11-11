export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Post {
  id?: string
  title: string
  text: string
  textUa: string
  picture: string
  author: string
  date: Date
}

export interface LikePost {
  id?: string
  idPost: Post['id']
  like: boolean
}

export interface Comment {
  id?: string
  idPost: Post['id']
  authorName: string
  reaction: string
  commentContent: string
  date?: Date
  editedDate?: Date
}

export interface Reply {
  id?: string
  idComment: Comment['id']
  authorName: string
  replyContent: string
  date: Date
}
