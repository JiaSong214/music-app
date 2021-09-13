import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchSearchResults } from '../api.js';
import SongList from "../components/songList.jsx";

const Search = ({accessToken}) => {
  const [result, setResult] = useState();
  const { term } = useParams();

  useEffect(() => {
    fetchSearchResults(accessToken, term)
      .then(data => setResult(data))
  }, [accessToken, term])


  return (!result || result.length === 0) ? null : (
    <div className='view'>
      <div className='view__titleBox'>
        <h1 className='view__title'>Search results of {`"${term}'"`}</h1>
      </div>
      <SongList data={result}/>
    </div>
  );
}

export default Search;