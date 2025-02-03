import { Server } from "socket.io"
import { createServer, Server as HTTPServer} from "http"
import {  BrowserWindow } from "electron"
import { Stats } from "../../shared/types/stats";


export class SocketManager {

  private static instance: SocketManager;
  private window: BrowserWindow;

  private httpServer: HTTPServer;
  private io: Server;
  private port: number;


  public static getInstance(mw: BrowserWindow, port: number) {
    if(!SocketManager.instance) {
      SocketManager.instance = new SocketManager(mw, port)
    }
    return SocketManager.instance!
  }

  private constructor(mw: BrowserWindow, port: number) {

    this.window = mw;
    this.port = port;

    this.httpServer = createServer();

    this.io = new Server(this.httpServer, {
      cors: {
        origin: "*"
      }
    })


    this.io.on('connection', (socket) => {

      console.log("Socket is open", socket.id);

      socket.on('system-stats', (stats: Stats) => {
        this.window.webContents.send('status', stats)
      })

      socket.on('disconnect', () => {
        console.log("Device disconnected", socket.id);
      })


    })


    this.httpServer.listen(port);
    console.log("Server is listening port", port);

  }



}