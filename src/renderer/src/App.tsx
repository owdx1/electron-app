/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App(): JSX.Element {
  const ipcHandle = (): Promise<{ success: boolean; message: string}> => window.electron.ipcRenderer.invoke('auth:login', {
    username: "can",
    password: "123"
  })

  const [no, setNo] = useState(0);

  useEffect(() => {
    window.electron.ipcRenderer.on('number', (_, no: number) => {
      setNo(no);
    })
  }, [])

  const handleClick = async (): Promise<void> => {
    const response = await ipcHandle();

    console.log(response.message, response.success);
  }

  return (
    <main className="p-4">
      <button className="p-4 bg-slate-300 underline m-4" onClick={() => handleClick()}> click </button>
      <Button variant={"destructive"}>ananı sıkeyım</Button>
      <Input className="rounded"/>
      {no}
    </main>
  )
}

export default App