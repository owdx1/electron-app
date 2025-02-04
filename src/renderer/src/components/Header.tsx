import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import { UserCircle, LogOut, Settings, User } from 'lucide-react'

const Header = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <header className="flex items-center justify-between px-6 border-b border-black/20 h-16 w-full bg-white">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center justify-center hover:bg-slate-200 gap-2 px-2 py-1 transition rounded'>
              <span>{user.name}</span>
              <span><UserCircle size={20}/></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center gap-2 text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2"
          >
            <UserCircle className="h-5 w-5" />
            Login
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header