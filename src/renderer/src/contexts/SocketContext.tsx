import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Stats } from "../../../shared/types/stats"

interface SocketContextType {
  stats: Stats | null
}


const SocketContext = createContext<SocketContextType | null>(null);


const SocketProvider = ({ children } : { children : ReactNode}) => {

  const [stats, setStats] = useState<Stats | null>(null)


  useEffect(() => {
    window.electron.ipcRenderer.on('status', (_, stats: Stats) => {
      setStats(stats)
    })
  }, [])


  return(
    <SocketContext.Provider value={{ stats }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider

export const useSocket = () => {
  const context = useContext(SocketContext)

  if(!context) {
    throw new Error('useSocket must be inside of SocketProvider')
  }

  return context;
}