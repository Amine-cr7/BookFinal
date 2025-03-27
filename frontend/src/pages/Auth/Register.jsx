import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { register,reset } from '../features/auth/authSlice'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role:'',
    password: '',
    password2: ''
  })
  const { username,role, email, password, password2 } = formData

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {user,isLoading,isError,isSuccess,message} = useSelector(state => state.auth)


  useEffect(() => {
    if(isError && message){
      alert(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
  },[user,isError,isSuccess,message,navigate,dispatch])

  useEffect(() => {
    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch]);

  const onchange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
        alert("Password Not Match")
    }
    else{
      const userData = {
        username,
        email,
        password,
        role
      }
      dispatch(register(userData))
    }
  }
  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <section className='heading '>
        <h1 className='text-center'>
           Create Account
        </h1>
      </section>
      <section className="form w-75">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group mt-2">
            <input type="text" className='form-control' id='username'
              name='username' value={username} placeholder='Enter Your Usrname'
              onChange={onchange}
            />

          </div>
          <div className="form-group mt-2">
            <input type="text" className='form-control' id='role'
              name='role' value={role} placeholder='Enter Your Role'
              onChange={onchange}
            />

          </div>
          <div className="form-group mt-2">
            <input type="email" className='form-control' id='email'
              name='email' value={email} placeholder='Enter Your Email'
              onChange={onchange}
            />
            
          </div>
          <div className="form-group mt-2">
            <input type="password" className='form-control' id='password'
              name='password' value={password} placeholder='Enter Your Password'
              onChange={onchange}
            />
            
          </div>
          <div className="form-group mt-2">
            <input type="password" className='form-control' id='password2'
              name='password2' value={password2} placeholder='Cofirm Your Password'
              onChange={onchange}
            />
          </div>
          <div className="form-group mt-2 text-center ">
            <button className='btn w-25 p-2 fs-5 bg-dark text-light btn-block'>Submit</button>
          </div>
        </form>
      </section>
      </div>
    </>
  )
}
