import './MovieInfo.scss';
import Carousel from './Carousel';
import {API} from '../Api/API.js';

function secondsToHm(min) {
    const h = Math.floor(min / 60);
    const m = Math.floor(min % 60);

    const hDisplay = h > 0 ? `${h}h`: '';
    let mDisplay;
    
    if(m === 0){
      mDisplay = `00m`
    }
    else if(m > 0 && m < 10){
      mDisplay = `0${m}min`
    }
    else if(m >= 10){
      mDisplay = `${m}min`
    }

    const time = hDisplay 
                   ? `${hDisplay} ${mDisplay}`
                   : mDisplay;

    return time; 
}


export default function MovieInfo({
  movie,
  src,
}){

  const id = movie.info.id;


  return(
    <div className='Movie__info'>
      <div className='Movie__info-poster'>
	<img src={src} alt="" />
      </div>
      <div className='Movie__info-container'>
	<div className='Movie__info-header'>
	  <h1>{movie.info.title}</h1>
	  <h5>
	    {movie.info.release_date.slice(0,4)}
	    <span className='white-spaces'>w</span>
	    {' * '}
	    <span className='white-spaces'>w</span>
	    {secondsToHm(movie.info.runtime)}
	  </h5>
	</div>
        <div className='Movie__info-rate'>
          <div className='info-rate__average'>
	    <span className="material-symbols-outlined">
	      star
	    </span>
          <span className='average__number'>{movie.info.vote_average}</span>
          </div>
          <h2 className='info-rate__tagline'>{movie.info.tagline}</h2>
	</div>
	<div className='Movie__info-overview'>
	  <h2>Overview</h2>
	  <p>
	    {movie.info.overview}
	  </p>
	</div>
	<div className='Movie__info-categories'>
	  {
	    movie.info.genres.map((gen,i) => {
	      if(i + 1 === movie.info.genres.length){
		return <span key={i}> {gen.name}</span>
	      }
	      else{
		return <span key={i}> {gen.name},</span>
	      }
	    })
	  }
	</div>
	{
	  movie.info.id 
            ? <Carousel 
		API={API}
	        width={'large'}
		endpoint={`/movie/${id}/similar`} 
		section={'Similar'}
	        movie={movie}/>
	    : null
	}
      </div>
    </div>
  )
}
