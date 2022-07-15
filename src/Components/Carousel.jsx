import './Carousel.scss';
import arrow from '../Assets/icons/arrow.svg';
import Card from './Card';
import Button from './Miscellaneous/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Carousel({
  API,
  endpoint,
  section,
  width,
  ...props
}) {
  const [movies, setMovies] = useState([]);


  async function getMovies(){
    const {data, status} = await API(`${endpoint}`)

    setMovies(data.results)

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }
  }

  useEffect(() =>{
    getMovies()
  },[props.movie]);

  return(
    <article className='Carousel'>
      <h1 className='Carousel-title'>{section}</h1>
      <Link 
        className={props.displayGrid ? 'inactive' : 'Link'}
        to={`${section}`}
      >
	<div 
          className={ 
	    section === 'General' 
	      ? 'inactive' 
	      : 'Carousel__show-more-button'}
        >
	  <Button
	    text='Show More'
	    icon={true}
	    src={arrow}
	    rotate={'-90deg'}
	  />
	</div>
      </Link>
      <div className={
	props.displayGrid 
	  ? 'cards-container--grid' 
	  : 'cards-container'}
      >
        {
	  movies.map((movie, i) => {
	    return <Card 
	             key={i}
	             id={movie.id}
	             width={width}
	             src={width === 'poster' ? movie.poster_path : movie.backdrop_path }
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
