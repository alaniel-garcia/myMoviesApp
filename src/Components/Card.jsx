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


  return(
    <div className={width}>     
      <img 
        className='card__movie-img--large'
        src={API_URL_IMG_LARGE + src} 
        alt={title} 
      />
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
	    />
          </Link>
        </div>
      </div>
    </div>
  )
}
