import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import { getBooks, reset } from './features/books/bookSlice'
import Register from './pages/Register'
import Login from './pages/Login'
import { logout } from './features/auth/authSlice'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import Dashboard from './pages/Dashboard'
import ShowBook from './pages/ShowBook'
export default function App() {
  const dispatch = useDispatch()
    const onlogout = () => {
      dispatch(logout())
    }
  return (
    <BrowserRouter>
     <div className="container">
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/book/:_id' element={<ShowBook/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  )
}
