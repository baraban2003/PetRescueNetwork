export type Credentials = {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export type Login = {
  email: string
  password: string
}

export type ApiResponse = {
  user: {}
  token: string
}
