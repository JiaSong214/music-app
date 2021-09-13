import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserData } from '../api';
import '../styles/header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector(state => state.token.access_token, shallowEqual);
  const user = useSelector(state => state.user.data, shallowEqual);

  useEffect(() => {
    dispatch(fetchUserData(accessToken));
  }, [accessToken, dispatch]);


  const handleSubmitForm = (e) => {
    e.preventDefault();

    const searchTerm = e.target[0].value;
    history.push(`/search/${searchTerm}`);

    //clear input box
    e.target[0].value = '';
  }


  return !user?.display_name ? "" : (
    <header>
      <form onSubmit={handleSubmitForm}>
        <input placeholder='Search' />
      </form>
      <div className='user'>
        <img 
          className='userImg' 
          src={user.images[0].url} 
          alt='user profile' 
        />
        <div className='userName'>
          {user.display_name}
        </div>
      </div>
    </header>
  )
}

export default Header;