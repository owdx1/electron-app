import React, { useEffect } from 'react'
import { toast } from 'sonner'


const MessageListener = () => {

  useEffect(() => {
    window.electron.ipcRenderer.on('server-message', (_, message: string) => {
      toast(message)
    })
  }, [])


  return (
    null
  )
}

export default MessageListener