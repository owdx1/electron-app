import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SidebarProvider } from './components/ui/sidebar'
import { AppSidebar } from './components/AppSidebar'
import { Toaster } from './components/ui/sonner'
import Header from './components/Header'
import { BrowserRouter } from "react-router-dom"
import MessageListener from './components/MessageListener'
import SocketProvider from './contexts/SocketContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <SocketProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className='flex flex-col w-full'>
          <Header />  
          <App /> 
        </div>
        <Toaster />
      </SidebarProvider>
      <MessageListener />
    </SocketProvider>
  </BrowserRouter>
)
