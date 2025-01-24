/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

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
    <main>
      <button className="bg-slate-400 p-4 rounded" onClick={() => handleClick()}> click </button>
      {no}
    </main>
  )
}

export default App