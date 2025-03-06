import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import { getBooks, reset } from './features/books/bookSlice'
import Register from './pages/Register'
import Login from './pages/Login'
import { logout } from './features/auth/authSlice'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
export default function App() {
  const dispatch = useDispatch()
    const onlogout = () => {
      dispatch(logout())
    }
  return (
    <BrowserRouter>
     <div className="container">
      <Routes>
        <Route path='/' element={
          <div>
            <button className='btn btn-danger' onClick={onlogout}>logout</button>
            <Link to={"/login"}>login</Link>
            <Link to={"/register"}>register</Link>
          </div>
        }/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  )
}
