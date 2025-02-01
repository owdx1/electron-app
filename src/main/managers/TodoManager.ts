import { PrismaClient, Todo } from "@prisma/client"
import { ipcMain } from "electron";


export class TodoManager {


  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient();

    ipcMain.handle('get-todos', (_) => {
      return this.getTodos()
    })

    ipcMain.handle('create-todo', async (_, payload: { title: string, content: string }) => {
      return this.createTodo(payload.title, payload.content)
    })

    ipcMain.handle('delete-todo', (_, id: string) => {
      return this.deleteTodo(id)
    })

    ipcMain.handle('toggle-todo', (_, id: string, status: boolean) => {
      return this.toggleTodo(id, status)
    })
  }

  async getTodos() {
    try {
      // SELECT * FROM todos 
      const todos = await this.prisma.todo.findMany({
        orderBy: {
          title: "asc"
        }
      })

      return {
        success: true,
        message: "Todos fetched",
        todos
      }
      
    } catch (error) {
      return {
        success: false,
        message: `Server Error: ${error}`,
      }
    }
  }

  async createTodo(title: string, content: string) {
    try {

      const todo = await this.prisma.todo.create({
        data: {
          title,
          content
        }
      })

      return {
        success: true,
        message: "Todo Created",
        todo
      }

      
    } catch (error) {
      return {
        success: false,
        message: `Server Error ${error}`,
      }
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.prisma.todo.delete({
        where: {
          id
        }
      })

      return {
        success: true,
        message: "Todo deleted"
      }

    } catch (error) {
      return {
        success: false,
        message: `Server Error ${error}`,
      }
    }
  }

  async toggleTodo(id: string, status: boolean) {
    try {
      
      await this.prisma.todo.update({
        where: {
          id
        },
        data: {
          checked: status
        }
      })

      return {
        success: true,
        message: "Todo updated"
      }


    } catch (error) {
      return {
        success: false,
        message: "Server error"
      }
    }
  }

}