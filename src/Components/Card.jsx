import './Card.scss';
import arrow from '../Assets/icons/arrow.svg';

const API_URL_IMG_LARGE = 'https://image.tmdb.org/t/p/w500';


export default function Card(props) {

  return(
    <div className={props.width}>     
      <img 
        className='card__movie-img--large'
        src={API_URL_IMG_LARGE + props.src} 
        alt={props.title} 
      />
      <h2 className='card__title'>
        {props.title}
      </h2>
      <div className='details-container'>
	<div className='details__release'>
          <span>{props.release.slice(0,4)}</span>
        </div>
        <div className='details__button'>
          <p className='button-text'>
	    Details
	  </p>
	  <img 
            className='button-arrow'
            src={arrow}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
