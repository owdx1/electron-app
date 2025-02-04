/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { TodoManager } from './managers/TodoManager'
import { SocketManager } from './managers/SocketManager'
import axios from "axios"
function createWindow(): BrowserWindow {

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  
  const window = createWindow()

  const base_path = "http://192.168.1.103:8000/api/auth/"

  ipcMain.handle('auth:login', async (_, payload: { email: string, password: string }) => {
    try {

      if(!payload.email || !payload.password) {
        return {
          success: false,
          message: "Invalid Credentials",
        };
      }

      const resp = await axios.post(base_path + "login/", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = resp.data;
  
      if (resp.status !== 200 || data.success === false) {
        return {
          success: false,
          message: data.message || 'Login failed',
        };
      }

      return {
        success: true,
        token: data.token,
        user: data.user,
        message: data.message,
      };
    } 
    
    catch (error) {
      console.error('Login Error:', error);
      return {
        success: false,
        message: 'Failed to connect to server',
      };
    }
  });

  ipcMain.handle("auth:validate", async (_, token: string) => {
    try {

      const resp = await axios.post(base_path + "validate-token/", { token: token }, {
        headers: {
          'Content-Type':'application/json'
        }
      })

      const data = resp.data

      if(resp.status !== 200) {
        return {
          success: false,
          message: data.message
        }
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
        ntoken: data.ntoken
      }
      
    } catch (error: any) {
      console.error('Validation Error!');
      return {
        success: false,
        message: 'Server Error',
      };
    }
  })

  ipcMain.handle("auth:register", async(_, payload: { email: string, password: string}) => {

    try {

      if(!payload.email || !payload.password) {
        return {
          success: false,
          message: "Invalid Credentials",
        };
      }

      const resp = await axios.post(base_path + "register/", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = resp.data;
  
      if (resp.status !== 200 || data.success === false) {
        return {
          success: false,
          message: data.message || 'Register failed',
        };
      }

      return {
        success: true,
        token: data.token,
        user: data.user,
        message: data.message,
      };
    } 
    
    catch (error: any) {

      if(error.status === 409) {
        return {
          success: false,
          message: 'Exists',
        };
      }
      return {
        success: false,
        message: 'Failed to connect or exists',
      };
    }

  })
  

  ipcMain.handle("auth:logout", async(_, userid: string) => {

    try {

      if(!userid) {
        return {
          success: false,
          message: "Invalid logout",
        };
      }

      const resp = await axios.post(base_path + "logout/", { userid: userid }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("gelen responseeeeeeeeeeeeeeee", resp);
  
      const data = resp.data;
  
      if (resp.status !== 200 || data.success === false) {
        return {
          success: false,
          message: data.message || 'logout failed',
        };
      }

      return {
        success: true,
        message: data.message,
      };
    } 
    
    catch (error: any) {
      if(error.status === 409) {
        return {
          success: false,
          message: 'Exists',
        };
      }
      return {
        success: false,
        message: 'Failed to connect',
      };
    }

  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})