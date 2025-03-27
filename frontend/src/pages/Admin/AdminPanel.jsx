import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../features/users/userSlice'
import { Link } from 'react-router-dom'

export default function AdminPanel() {
  const { users, isError, isLoading } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const usersList = users?.users || [];


  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  return (
    <>
      <div className='row mb-4 g-4'>
        <div className='col-lg-9 p-4'>
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-primary">
              <tr>
                <th> Show user </th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user._id}</td>
                  <td>
                    <Link to={`/admin/users/${user._id}`} className="btn btn-primary">
                      Show user
                    </Link>
                    <Link to={`/admin/users/create-user`} className="btn btn-primary" >
                      Add user
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {isLoading && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
            style={{ zIndex: 9999 }}>
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {isError && (
          <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3"
            style={{ zIndex: 9999 }}>
            Failed to load books. Please try again.
          </div>
        )}
      </div>
    </>
  )
}