import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)


  useEffect(() => {
    if (isError && message) {
      alert(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    
    
  }, [user, isError, isSuccess, message, navigate])

  useEffect(() => {
    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch]);
  const onchange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if(!password || !email){
      alert("Fileds Required")
    }else{
      dispatch(login({email,password}))
    }
  }
  
  return (
    <>
      <section className='heading'>
        <h1>
        </h1>
        <p>please Log in your account</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className='form-control' id='email'
              name='email' value={email} placeholder='Enter Your Email'
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <input type="password" className='form-control' id='password'
              name='password' value={password} placeholder='Enter Your Password'
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>      
    </>
  )
}