import { useSelector, shallowEqual } from 'react-redux';
import SongList from "../songList";

const SearchResults = () => {
  const data = useSelector(state => state.songs.data, shallowEqual);
  const searchTerm = useSelector(state => state.songs.search_term, shallowEqual)


  if(!data) return null;
  return (
    <div className='view'>
      <div className='view__titleBox'>
        <h1 className='view__title'>Search results of {`"${searchTerm}'"`}</h1>
        {/* <div className='playBtn'>Play</div> */}
      </div>
      <SongList data={data}/>
    </div>
  );
}

export default SearchResults;