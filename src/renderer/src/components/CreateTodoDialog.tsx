import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Todo } from '@prisma/client'

type CreateTodoDialogProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>

  setTodos: Dispatch<React.SetStateAction<{
      id: string;
      title: string;
      content: string;
      checked: boolean;
  }[]>>
}

const CreateTodoDialog: FC<CreateTodoDialogProps> = ({ isOpen, setIsOpen, setTodos }) => {

  const [newTodo, setNewTodo] = useState<{title: string, content: string}>({
    title: "",
    content: ""
  })


  const handleCreateTodo = () => {
    window.todoAPI.createTodo(newTodo)
    .then((response) => {
      toast(response.message)
      if(response.todo && response.success) {
        setTodos(prev => [...prev, response.todo as Todo])

        setIsOpen(false)
      }

    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      console.log("final");
    })

  
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogHeader>
        <DialogTitle>Create TODO</DialogTitle>
      </DialogHeader>
      <DialogContent className='flex flex-col gap-4'>
        <div>
          <label htmlFor=""> Title</label>
          <Input 
            value={newTodo.title}
            onChange={(e) => setNewTodo({
              ...newTodo,
              title: e.target.value
            })}
          />
        </div>
        <div>
          <label htmlFor=""> Content </label>
          <Input 
            value={newTodo.content}
            onChange={(e) => setNewTodo({
              ...newTodo,
              content: e.target.value
            })}
          />
        </div>

        <Button onClick={handleCreateTodo}> Create todo </Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateTodoDialog