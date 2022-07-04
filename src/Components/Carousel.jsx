import './Carousel.scss';
import Card from './Card';
import { useEffect, useState } from 'react';


export default function Carousel(props) {

  const [movies, setMovies] = useState([]);


  async function getMovies(){
    const res = await fetch(`${props.API_URL}${props.endpoint}?api_key=${props.API_KEY}`)/*{
      headers: {
	'Content-Type': 'application/json',
	'api_key': props.API_KEY,
      }
    })*/

    const data = await res.json();
     setMovies(data.results)

    if(res.status !== 200){
      console.log(`Algo ocurrió. Estado: ${res.status}. Mensaje: ${data.message}`)
    }
    else{
      console.log(movies)
    }
  }

  useEffect(() =>{
    getMovies()
  },[]);

  useEffect(() => {
    console.log(movies)
  },[movies]);


  return(
    <article className='Carousel'>
      <h1 className='Carousel-title'>{props.section}</h1>
      <div className={props.section !== 'General' ? 'cards-container' : 'cards-container--grid'}>
        {
	  movies.map((movie, i) => {
	    return <Card 
	             key={i}
	             width={props.width}
	             src={props.width === 'poster' ? movie.poster_path : movie.backdrop_path }
	             title={movie.original_title}
	             overview={movie.overview}
	             release={movie.release_date}
	           />
	  })
	}
      </div>
    </article>
  )
}
