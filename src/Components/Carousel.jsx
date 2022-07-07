import './Carousel.scss';
import Card from './Card';
import { useEffect, useState } from 'react';


export default function Carousel(props) {

  const [movies, setMovies] = useState([]);


  async function getMovies(){
    const {data, status} = await props.API(`${props.endpoint}`)

    setMovies(data.results)

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }
  }

  useEffect(() =>{
    getMovies()
  },[]);


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
