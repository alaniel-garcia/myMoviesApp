import './Carousel.scss';
import arrow from '../Assets/icons/arrow.svg';
import Card from './Card';
import Button from './Miscellaneous/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <Link 
        className={props.displayGrid ? 'inactive' : 'Link'}
        to={`/${props.section}`}
      >
	<div 
          className={ 
	    props.section === 'General' 
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
