import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchSearchResults, fetchUserData } from '../api';
import { updateViewType } from '../store/modules/mainView';
import '../styles/header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.token.token, shallowEqual);
  const user = useSelector(state => state.user.data, shallowEqual);


  useEffect(() => {
    dispatch(fetchUserData(accessToken));
  }, [accessToken, dispatch]);





  const handleSubmitForm = (e) => {
    e.preventDefault();

    const searchTerm = e.target[0].value;

    //update a view type
    dispatch(updateViewType('search'));
    //fetch search results
    dispatch(fetchSearchResults(accessToken, searchTerm));

    //clear input box
    e.target[0].value = '';
  }


  if(!user || !user.display_name) return null;
  return (
    <header>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <input placeholder='Search'></input>
      </form>
      <div className='user'>
        <img className='userImg' src={user.images[0].url} alt='user profile' />
        <div className='userName'>{user.display_name}</div>
      </div>
    </header>
  )
}

export default Header;