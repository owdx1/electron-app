import { Loader2Icon } from "lucide-react"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export type UserT = {
  name: string
  email: string
  id: string
}

export interface AuthContextType {
  login: (payload: { email: string, password: string }) => Promise<void>
  register:(payload: { name: string, email: string, password: string}) => Promise<void>
  logout: () => Promise<void>
  validateToken:(token: string) => Promise<void>
  user: UserT | null
  compLoading: boolean

}

const AuthContext = createContext<AuthContextType | null>(null) 


export const AuthContextProvider = ({ children } : { children: ReactNode }) => {


  const navigate = useNavigate();
  const [user, setUser] = useState<UserT | null>(null);
  const [loading, setLoading] = useState(true)
  const [compLoading, setCompLoading] = useState(false)

  const login = async (payload: { email: string, password: string }) => {
    setCompLoading(true)
    const response = await window.authAPI.login(payload)
    setCompLoading(false)
    toast(response.message);

    console.log("login responsee", response);

    if(response.success && response.user && response.token) {
      setUser(response.user)
      localStorage.setItem("auth-token", response.token)
      navigate("/")
    }
  }

  const register = async (payload: {name: string, email: string, password: string}) => {
    setCompLoading(true)

    const response = await window.authAPI.register(payload);
    setCompLoading(false)

    toast(response.message);

  }

  const logout = async () => {

    if(!user) {
      toast("User is not logged in");
      return
    }

    const response = await window.authAPI.logout(user.id)
    toast(response.message);

    if(response.success) {
      setUser(null);
      localStorage.removeItem("auth-token");
      navigate("/login")
    }
  }

  const validateToken = async (token: string) => {

    const resp = await window.authAPI.validateToken(token)
    setLoading(false);


    toast(resp.message)

    if(resp.success && resp.ntoken && resp.user) {
      setUser(resp.user);
      localStorage.setItem("auth-token", resp.ntoken);
      return
    }

    navigate("/login")
    setUser(null)
    localStorage.removeItem("auth-token")

  }
  useEffect(() => {
    const checkCredentials = async () => {

      const token = localStorage.getItem("auth-token")

      if(token === "" || !token) {

        toast("No token found")

        setLoading(false);
        localStorage.removeItem("auth-token")
        setUser(null);
        navigate("/login")
        return
      }

      validateToken(token);

    }

    checkCredentials();
  }, [])


  if(loading) {
    return <div className="w-full min-h-screen flex items-center justify-center gap-2"> Loading the app <Loader2Icon className="animate-spin"/></div>
  }

  return(
    <AuthContext.Provider value={{ login, user, register, logout, validateToken, compLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth must be inside of SocketProvider')
  }

  return context;
}