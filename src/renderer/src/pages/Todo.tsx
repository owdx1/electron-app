import { useEffect, useState } from 'react';
import { Todo } from '@prisma/client';
import { Loader2, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import CreateTodoDialog from '@/components/CreateTodoDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await window.todoAPI.getTodos();
        if (response.success && response.todos) {
          setTodos(response.todos);
        }
      } catch (error) {
        toast.error(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleDeleteTodo = async (id: string) => {
    try {
      const resp = await window.todoAPI.deleteTodo(id);
      if (resp.success) {
        setTodos(todos.filter((todo) => todo.id !== id));
        toast.success(resp.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleToggleTodo = async (id: string, status: boolean) => {
    try {
      const resp = await window.todoAPI.toggleTodo(id, status);
      if (resp.success) {
        setTodos(prev => prev.map((todo) => {
          if(todo.id === id) {
            return { ...todo, checked: !todo.checked}
          }
          return todo
        }))
        toast.success(resp.message);
      }
    } catch (error) {
      toast.error(error as string);
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center gap-2 rounded"
        >
          <Plus className="w-4 h-4" />
          Add Todo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Todos</span>
            <Badge variant="secondary" className='rounded'>
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todos.map((todo) => (
                <Card key={todo.id} className="group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={cn({
                            "w-4 h-4 text-primary cursor-pointer": true,
                            "opacity-70 text-gray-200": !todo.checked,
                            "text-green-600": todo.checked
                          })}
                          
                          onClick={() => handleToggleTodo(todo.id, !todo.checked)}
                          
                          />
                          <h3 className="font-semibold">{todo.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {todo.content}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {todos.length === 0 && (
              <div className="text-center py-12">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No todos yet</h3>
                <p className="text-sm text-muted-foreground">
                  Create your first todo to get started
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <CreateTodoDialog
        setTodos={setTodos}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default TodoPage;