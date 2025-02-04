import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('todoAPI', {
      getTodos: () => ipcRenderer.invoke('get-todos'),
      createTodo: (payload: { title: string, content: string}) => ipcRenderer.invoke('create-todo', payload),
      deleteTodo: (id: string) => ipcRenderer.invoke('delete-todo', id),
      toggleTodo: (id: string, status: boolean) => ipcRenderer.invoke('toggle-todo', id, status)
    })

    contextBridge.exposeInMainWorld('authAPI', {
      login:(payload: { email: string, password: string }) => ipcRenderer.invoke("auth:login", payload),
      register:(payload: { name: string, email: string, password: string }) => ipcRenderer.invoke("auth:register", payload),
      logout:(userid: string) => ipcRenderer.invoke("auth:logout", userid),
      validateToken: (token: string) => ipcRenderer.invoke("auth:validate", token)
    })


  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
