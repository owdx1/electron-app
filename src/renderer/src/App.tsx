/* eslint-disable prettier/prettier */

import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Authentication"
import TodoPage from "./pages/Todo"
import Stats from "./pages/Stats"


function App(): JSX.Element {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/todo" element={<TodoPage />}/>
      <Route path="/stats" element={<Stats />}/>
    </Routes>
  )
}

export default App