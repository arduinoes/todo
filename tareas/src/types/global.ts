export interface Credentials {
  email?: string | undefined
  password?: string | undefined
  provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

export interface Todo {
  id?: number
  user_id: string
  task: string
  is_complete?: boolean
  inserted_at?: string
}