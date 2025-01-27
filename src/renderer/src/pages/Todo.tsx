import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Todo } from '@prisma/client'
import { Loader2Icon, PlusIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'


export type CreateTodoT = {
  title: string
  content: string
}



const TodoPage = () => {

  const [todos, setTodos] = useState<Todo[]>([])

  const [loading, setLoading] = useState(false)

  const [newTodo, setNewTodo] = useState<CreateTodoT>({
    title: "",
    content: ""
  })



  useEffect(() => {

    const fetchTodos = async () => {
      try {

        const response = await window.todoAPI.getTodos()
        if(response.success && response.todos) {
          setTodos(response.todos)
        }
    
      } catch (error) {
        toast(error as string)
      }
    }
    fetchTodos();
  }, [])


  const handleCreateTodo = async () => {

    setLoading(true);

    const response = await window.todoAPI.createTodo(newTodo)

    setLoading(false);
    toast(response.message);

    if (response.success && response.todo?.id && response.todo !== null) {
      setTodos(prev => [...prev, response.todo]);

      setNewTodo({
        title: '',
        content:''
      })
    }
  }

  const handleDeleteTodo = async (todoId: string) => {
    setLoading(true);

    try {
      const response = await window.todoAPI.deleteTodo(todoId)

      setLoading(false);
      toast(response.message)

      if(response.success) {
        setTodos(todos.filter(todo => todo.id !== todoId))
      }

    } catch (error) {
      toast(error as string)
    } 
  }

  const handleToggleTodo = (todoId: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === todoId 
        ? { ...todo, checked: !todo.checked }
        : todo
    ))
  }

  return (
    <div className='flex flex-col gap-4 p-4'>

      <header className='flex items-center justify-between px-4 py-2 border-b'>
        <div>todos</div>
        <Dialog>
          <DialogTrigger> 
            <PlusIcon /> 
          </DialogTrigger>
          <DialogContent>
            <label htmlFor="">Title</label>
            <Input 
              value={newTodo.title}
              onChange={(e) => setNewTodo({
                ...newTodo,
                title: e.target.value
              })}
              placeholder='Enter Title'
              className='rounded'
            />

            <label htmlFor="">Content</label>
            <Input 
              value={newTodo.content}
              onChange={(e) => setNewTodo({
                ...newTodo,
                content: e.target.value
              })}
              placeholder='Enter Content'
              className='rounded'
            />

            <Button className={cn({
                "rounded flex items-center justify-center gap-4": true,
                "disabled opacity-40 pointer-events-none": loading
              })}

              onClick={handleCreateTodo}

            >
              Create Todo
              {loading && <Loader2Icon className="animate-spin"/>}
            </Button>
          </DialogContent>
        </Dialog>
      </header>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {todos.map((todo) => (
        <Card 
          key={todo.id} 
          className={cn(
            "transition-all duration-300",
            todo.checked ? "opacity-50 bg-gray-100" : "hover:bg-gray-50"
          )}
        >
          <CardHeader>
            <CardTitle 
              className={cn(
                "transition-all",
                todo.checked ? "line-through text-gray-500" : ""
              )}
            >
              {todo.title}
            </CardTitle>
          </CardHeader>
          <CardContent 
            className={cn(
              "transition-all flex-1 h-full",
              todo.checked ? "text-gray-500 italic" : ""
            )}
          >
            {todo.content}
          </CardContent>
          <CardFooter className='flex items-center justify-end space-x-2'>
            <Checkbox 
              checked={todo.checked}
              onCheckedChange={() => handleToggleTodo(todo.id)}
              className="mr-2"
            />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
      </div>
    </div>
  )
}

export default TodoPage