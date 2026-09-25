import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Folder from './Pages/Folder';
import Signup from './Pages/Signup';
import Login from './Pages/login';
import ProtectedRoute from './ProtectedRoute';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup"element={<Signup/>} />
          <Route path="/login"element={<Login/>} />
          <Route path="/homepage"element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
          <Route path="/folder/:id"element={<ProtectedRoute><Folder/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
