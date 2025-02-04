import { UserT } from '@/contexts/AuthContext'
import { ElectronAPI } from '@electron-toolkit/preload'
import { Todo } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    todoAPI: {
      getTodos: () => Promise<{ success: boolean, message: string, todos?: Todo[]}>
      createTodo: (payload: {title: string, content: string}) => Promise<{success: boolean, message: string, todo?: Todo}>
      deleteTodo: (id: string) => Promise<{success: boolean, message: string}>
      toggleTodo: (id: string, status: boolean) => Promise<{success: boolean, message: string}>
    },

    authAPI: {
      login: (payload: { email: string, password: string }) => Promise<{success: boolean, message: string, user?: UserT, token?: string}>
      register: (payload: { name: string ,email: string, password: string }) => Promise<{success: boolean, message: string}>
      logout: (userid: string) => Promise<{ message: string, success: boolean}>
      validateToken: (token: string) => Promise<{message: string, success: boolean, user?: UserT, ntoken?: string}> 
    }

  }
}
