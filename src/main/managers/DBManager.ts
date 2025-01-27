import { PrismaClient, Todo } from "@prisma/client"
import { ipcMain } from "electron";


export class DBManager {
  private prisma: PrismaClient


  constructor() {
    this.prisma = new PrismaClient();


    ipcMain.handle('get-todos', (_) => {
      return this.getTodos()
    })
    ipcMain.handle('create-todo', (_, payload: { title: string, content: string }) => {
      return this.createTodo(payload.title, payload.content);
    })

    ipcMain.handle('delete-todo', (_, todoId: string) => {
      return this.deleteTodo(todoId)
    })
  }

  async getTodos() {
    try {
      
      const todos = await this.prisma.todo.findMany({})

      return {
        success: true,
        message: "Todos fetched",
        todos
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Server Error",
      }     
    }
  }

  async createTodo(title: string, content: string) {
    try {
      
      const newTodo: Todo = await this.prisma.todo.create({
        data: {
          title,
          content
        }
      })

      return {
        success: true,
        message: "Todo created",
        todo: newTodo
      }

    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Server Error",
      }    
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await this.prisma.todo.delete({
        where: {
          id: todoId
        }
      })


      return {
        success: true,
        message: "Todo deleted",

      }
    } catch (error) {
      return {
        success: false,
        message: "Server Error",
      }   
    }
  }
}