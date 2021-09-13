import '../styles/artists.scss';
import artists_icon from '../assets/artists_icon.png';

const Artists = () => {
  return (
    <div className='view artists'>
      <h1 className='view__title'>
        Artists
      </h1>
      <img 
        className='artists__img' 
        src={artists_icon} 
        alt='icon'
      />
      <p>
        Your favorite artists will appear here. Go to your Browse page to find amazing playlists for every mood and moment.
      </p>
      <div className='artists__btn'>
        GO TO BROWSE
      </div>
    </div>
  );
}

export default Artists;