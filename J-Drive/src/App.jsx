import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Homepage"element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
