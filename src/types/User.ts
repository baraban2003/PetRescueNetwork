export interface User {
  user: {
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    location: string | null
  }
  token: string | null
  isLoggedIn: boolean
  isRefreshing: boolean
  error?: string | null
}
