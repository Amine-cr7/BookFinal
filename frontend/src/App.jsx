import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getBooks, reset } from './features/books/bookSlice'
export default function App() {
    const dispatch = useDispatch()
    let { books, isSuccess, isError, isLoading } = useSelector(state => state.books)
    useEffect(() => {
        dispatch(getBooks())
        return () => {
          dispatch(reset())
        }
      }, [])
    books = books.books
    console.log(books)
  return (
    <div>
        {books && books.map(item => (
            <li>{item.volumeInfo.title}</li>
        ))}
    </div>
  )
}
