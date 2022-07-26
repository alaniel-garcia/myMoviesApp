import './Card.scss';
import arrow from '../Assets/icons/arrow.svg';
import Button from './Miscellaneous/Button';
import { Link } from 'react-router-dom';

const API_URL_IMG_LARGE = 'https://image.tmdb.org/t/p/w500';


export default function Card({
  id,
  width,
  src,
  title,
  release,
  ...props
}) {

  const style = {
    borderRadius: '.6rem',
    boxShadow: '.2rem .2rem 1.6rem black'
  }

  return(
    <div className={width}>     
      {
	src ?
	  <img 
	    className='card__movie-img--large'
	    src={API_URL_IMG_LARGE + src} 
	    alt={title} 
	  />
	  :
	  <div 
	    className='card__movie-no-img'
            style={width === 'poster' ? style : null}>
	    <h2 
	      className='movie-no-img__title'
	      style={width !== 'poster' ? {display: 'none'} : null }>
	    {title}</h2>
	  </div>
      }
      <h2 className='card__title'>
        {title}
      </h2>
      <div className='details-container'>
	<div className='details__release'>
          <span>{release.slice(0,4)}</span>
        </div>
        <div className='details__button'>
          <Link className='Link' to={`/Movie/${id}`}>
	    <Button 
	      text='Details'
	      icon={true}
	      src={arrow}
	      rotate={'-90deg'}
              background={true}
	    />
          </Link>
        </div>
      </div>
    </div>
  )
}
