import { ElectronAPI } from '@electron-toolkit/preload'
import { Todo } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown,
    todoAPI: {
      getTodos: () => Promise<{ success: boolean, message: string, todos?: Todo[]}>
      createTodo: (payload: { title: string, content: string}) => Promise<{ success: boolean, message: string, todo: Todo | null}>
      deleteTodo: (todoId: string) => Promise<{ success: boolean, message: string}>
    }
  }
}
