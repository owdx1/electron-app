import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Header = () => {

  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between p-12 border-b border-black/20 h-20 w-full'>
      <SidebarTrigger />

      <Button variant={"outline"} className='rounded' onClick={() => toast("Clicked")}> Toast </Button>

      <Button className='rounded' onClick={() => navigate('/login')}> log in </Button>
    </header>
  )
}

export default Header