import './MovieInfo.scss';
import '../Skeleton.scss';
import Carousel from './Carousel';
import Skeleton from '@mui/material/Skeleton';
import { API } from '../Api/API.js';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

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

  const [t] = useTranslation('global')
  const id = movie.info.id;


  return(
    <div className='Movie__info'>
      <div className='Movie__info-poster'>
	<img src={src} alt="" />
      </div>
      <div className='Movie__info-container'>
        {movie.info.id && (
	  <Fragment>
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
	      <h2>{`${t('lang.overview')}`}</h2>
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
	  </Fragment>
	)}
        {!movie.info.id && (
	  <Fragment>
	    <div className='Skeleton Skeleton__info-header'>
	      <Skeleton variant='rectangular' width={'6.6rem'} height={'2rem'}/>
	      <Skeleton variant='rectangular' width={'13rem'} height={'1.6rem'}/>
	    </div>
	    <div className='Skeleton Skeleton__info-rate'>
	      <Skeleton variant='rectangular' width={'6.6rem'} height={'2rem'}/>
	      <Skeleton variant='rectangular' width={'20rem'} height={'1.6rem'}/>
	    </div>
	    <div className='Skeleton Skeleton__info-overview'>
	      <Skeleton variant='rectangular' width={'8rem'} height={'2rem'}/>
	      <Skeleton variant='rectangular' width={'100%'} height={'17rem'}/>
	    </div>
	  </Fragment>
	)}
      </div>
	  <Carousel 
	    API={API}
	    width={'large'}
	    endpoint={`/movie/${id}/similar`} 
	    section={'Similar'}
	    movie={movie}/>
    </div>
  )
}
