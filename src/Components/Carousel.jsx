import './Carousel.scss';
import arrow from '../Assets/icons/arrow.svg';
import Card from './Card';
import Button from './Miscellaneous/Button';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../index.scss';
import Skeleton from '@mui/material/Skeleton';

//function that loads skeletons for movie cards, also set the type and quantity for different cases
function loadingSkeleton(cardWidth){
  const locationPath = window.location.pathname;
  const width = cardWidth === 'large' ? 24 : 15;
  const height = cardWidth === 'large' ? 13.8 : 22.9;
  const screenSize = window.innerWidth / 10;
  let numCardsToPrint = Math.floor((screenSize / width) + 1);
  const cardsToprint = []; 
  let skeletonColor;

  if(locationPath.includes('Movie') && !locationPath.includes('Similar')){
    skeletonColor = 'default';
  }
  else{
    skeletonColor = colors.secondaryGrey;
  }

  if(locationPath !== '/')numCardsToPrint *=2.5;



  for(let i = 1; i <= numCardsToPrint; i++){
     cardsToprint.push(<div>
	      <Skeleton 
		sx={
		  { bgcolor: skeletonColor,
		    marginBlock: '.8rem'
		  }
		}
		variant='rectangular' 
		width={width + 'rem'} 
		height={height + 'rem'}>
	      </Skeleton>
	      <Skeleton 
		sx={
		  { bgcolor: skeletonColor }
		}
		variant='rectangular' 
		width={width + 'rem'} 
		height={'2rem'}/>
	    </div>)
  }
  return cardsToprint
}

export default function Carousel({
  API,
  endpoint,
  section,
  width,
  ...props
}) {
  const [movies, setMovies] = useState();
  const refCardsContainer = useRef();
  const refContentOnLeft = useRef();
  const refContentOnRight = useRef();
  const background= props.movie ? colors.white : colors.mainBg;


  /*
   * this function takes props.params which sets aditional parameters to the API call
   * in case the parent component of Carousel needs it
  */
  async function getMovies(){
    const {data, status} = await API(`${endpoint}`,{
      params: props.params
    })

    setMovies(data.results)

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }
  }

  //rerenders the component when changing movie while in movies component
  useEffect(() =>{
    getMovies()
  },[props.movie,section,props.params]);

  useEffect(() => {
    refCardsContainer.current.scrollLeft = 0;
  },[movies]);

  //sets the content delimiter elements to display or not based on if there is or not content left on each side of the carousel
  function scrollAvailable(){
    if(refCardsContainer?.current?.scrollLeft > 0){
      refContentOnLeft.current.style.display = 'initial';
    }
    else{
      refContentOnLeft.current.style.display = 'none';

    }

    if(refCardsContainer.current?.scrollLeft !== (refCardsContainer.current.scrollWidth - refCardsContainer.current.clientWidth)){
      refContentOnRight.current.style.display = 'initial';
    }
    else{
      refContentOnRight.current.style.display = 'none';
    }
  }


  return(
    <article className='Carousel'>
      <div className='Carousel__header'>
	<h1 className='Carousel-title'>{section}</h1>
	<Link 
	  className={props.notShowButton || props.displayGrid ? 'inactive' : 'Link'}
	  to={`${section}`}
	>
	  <div 
	    className={ 
	      section === 'General' 
		? 'inactive' 
		: 'Carousel__show-more-button'}
	  >
	    <Button
	      text='View all'
	      icon={true}
	      src={arrow}
	      rotate={'-90deg'}
              background={section === 'Similar' ? true : false}
	    />
	  </div>
	</Link>
      </div>
      <div className='Carousel__main-content'>
        {
	  //in case this component is not rendered as grid layout, there will be lateral
	  //delimiters of content
	  !props.displayGrid
	    ?  <Fragment><div 
		  ref={refContentOnLeft} 
		  className='content-on-left'
		  style={{backgroundImage: `linear-gradient(to right, ${background} 35%, transparent 100%)`}}
		  ></div><div 
		    ref={refContentOnRight} 
		    className='content-on-right'
		    style={{backgroundImage: `linear-gradient(to left, ${background} 35%, transparent 100%)`}}
		    ></div></Fragment>
	    : null
	}
        	<div 
	  onScroll={scrollAvailable}
	  ref={refCardsContainer}
	  className={
	  props.displayGrid 
	    ? 'cards-container--grid' 
	    : 'cards-container'}
	>
	  {movies &&
	    movies.map((movie) => {
	      return <Card 
		       key={movie.id}
		       id={movie.id}
		       width={width}
		       src={width === 'poster' ? movie.poster_path : movie.backdrop_path }
		       title={movie.original_title}
		       release={movie.release_date}
		     />
	    })
	  }
          {
	    !movies && loadingSkeleton(width)
	  }
	</div>
      </div>
    </article>
  )
}
