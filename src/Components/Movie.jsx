import './Movie.scss';
import '../Api/API';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Movie({API}){

  const {id} = useParams();
  const [movie, setMovie] = useState({});

  async function getMovie(){
    const {data, status} = await API(`/movie/${id}`);

      setMovie(data);

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }else{
    }
    console.log(movie)
  }

  useEffect(() => {
    getMovie();
  },[]);

  return (
    <div className='Movie'>
      <h1>{movie.title}</h1>
      <h2>hello</h2>
    </div>
  )
}
