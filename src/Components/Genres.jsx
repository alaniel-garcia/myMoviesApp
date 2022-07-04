import { useEffect, useState } from 'react';
import Carousel from './Carousel';

export default function Genres(props){
  const [genres,setGenres] = useState([]); 

  async function getGenres(){
    const res = await fetch(`${props.API_URL}/genre/movie/list?api_key=${props.API_KEY}`);

    const data = await res.json();

    setGenres(data);
    console.log(genres)
  }

  useEffect(()=>{
    getGenres();
  },[]);

  return(
    <article className='Genres'>
      <div className='Genres__container'>
      </div>
    </article>
  )
}
