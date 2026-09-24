import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Folder from './Pages/Folder';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Homepage"element={<HomePage/>} />
          <Route path="/folder/:id"element={<Folder/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
