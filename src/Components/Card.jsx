import './Card.scss';
import arrow from '../Assets/icons/arrow.svg';
import Button from './Miscellaneous/Button';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';



export default function Card({
  id,
  width,
  src,
  title,
  release,
  ...props
}) {

  const [t] = useTranslation('global')

  const style = {
    borderRadius: '.6rem',
    boxShadow: '.2rem .2rem 1.6rem black',
    paddingInline: '.8rem',
    background: '#232323',
    color: 'white'
  }

  const imgSize = width === 'poster' ? 'w200' : 'w300';
  const API_URL_IMG_LARGE = `https://image.tmdb.org/t/p/${imgSize}`;
  const refMovieCardImg = useRef();

  useEffect(() => {


    if(props.lazyLoading){
      const observer = new IntersectionObserver(entries => {
	entries.map(card => {
	  if(card.isIntersecting){
	    card.target.setAttribute('src', `${API_URL_IMG_LARGE}${src}`)
	  }
	})
      },{threshold: [0,1]})
      if(refMovieCardImg.current){
	observer.observe(refMovieCardImg.current)
      }
    }

  },[]);


  return(
    <div className={width}>     
      {
	src ?
	  <img 
	    ref={refMovieCardImg}
	    className='card__movie-img--large'
	    src={props.lazyLoading ? null : `${API_URL_IMG_LARGE}${src}`}
	    alt={title} 
	  />
	  :
	  <div 
	    className='card__movie-no-img'
            style={style}>
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
          <span>{
	    release && release.slice(0,4)
	  }</span>
        </div>
        <div className='details__button'>
          <Link 
            className='Link' 
            to={`/${t('lang.movie')}/${id}-${title}`}>
	    <Button 
	      text={ `${t('lang.details')}`}
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
