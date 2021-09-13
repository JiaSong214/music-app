import { Link } from 'react-router-dom';
import '../styles/albumList.scss';

const AlbumList = ({data}) => {
  return (!data || data.length === 0) ? "" : (
    <ul className='albumList'>
     {data.map(item => (
        <li 
          className='albumList__item' 
          key={item.album?.name || item.name} 
        >
          <Link to={item.icons ? "/" : `/album-tracks/${item.album?.id || item.id}`}>
            <img 
              className='albumList__img' 
              src={item.album?.images[0]?.url || ( item.images ? item.images[0].url : item.icons[0]?.url) || ""}
              alt='album cover' 
            />
            <h2 className='albumList__title'>
              {item.album?.name || item.name}
            </h2>
            <p className='albumList__artist'>
              {item.album?.artists[0].name || (item.artists ? item.artists[0].name : "")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default AlbumList;
