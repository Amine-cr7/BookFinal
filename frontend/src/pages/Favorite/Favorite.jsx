import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, deleteFavorite } from "../../features/favorite/favoriteSlice";

const Favorite = () => {
  const dispatch = useDispatch();
  const { favorites, isLoading, isError, message } = useSelector((state) => state.favorites);
  console.log(favorites)

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch, isError, message]);

  const handleRemove = (bookId) => {
    dispatch(deleteFavorite(bookId));
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Your Favorite Books</h2>
      {favorites.length === 0 ? (
        <p>No favorites found.</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav.book._id}>
              {fav.book.title} <button onClick={() => handleRemove(fav.book._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorite;
