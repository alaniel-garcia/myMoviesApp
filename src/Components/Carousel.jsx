import './Carousel.scss';
import arrow from '../Assets/icons/arrow.svg';
import {isTouchDevice} from '../Pages/pagesSharedFunctionalities';
import Card from './Card';
import Button from './Miscellaneous/Button';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../index.scss';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { v4 as keyGenerator } from 'uuid';
import { useTranslation } from 'react-i18next';



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
     cardsToprint.push(<div key={i}>
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
		  { bgcolor: skeletonColor,
		    marginBlockEnd: '2.4rem'
		  }
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
  const [t] = useTranslation('global')
  const [movies, setMovies] = useState();
  const refCardsContainer = useRef();
  const refContentOnLeft = useRef();
  const refContentOnRight = useRef();
  const background= props.movie ? colors.white : colors.mainBg;
  let page = 1;
  const [maxPage, setMaxPage] = useState();
  const didMount = useRef(true);
  const [changePaginationPage,setChangePaginationPage] = useState(parseInt(1));

  let theme = createTheme({
    palette: {
      primary:{
	main: `${colors.secondaryRed}`,
      } 
    },
    components: {
      MuiPagination: {
	styleOverrides: {
	  ul: {
	    justifyContent: 'center',
	    marginBlockStart: '1.6rem'

	  }
	}
      },
      MuiPaginationItem: {
	styleOverrides: {
	  root:{
	    color: colors.white,
	    fontSize: '1.4rem'
	  },
	  icon: {
	    width: '2rem',
	    height: '2rem'
	  }
	}
      }
    }
  })


  let infiniteScroll = () =>{
    const endOfPage = window.innerHeight + window.pageYOffset >= (document.body.offsetHeight - window.innerHeight);

    //removes scroll event when maxPage is reached
    if(page >= maxPage){
      window.removeEventListener('scroll', infiniteScroll)
      return
    }

    if(endOfPage){
      window.removeEventListener('scroll', infiniteScroll)
      getPaginatedMovies()
      setTimeout(() =>{
	window.addEventListener('scroll', infiniteScroll)
      },500);
    }
  };

  /*
   * this function takes props.params which sets aditional parameters to the API call
   * in case the parent component of Carousel needs it
  */
  async function getMovies(){


    if(props.params){
      props.params['language'] = `${t('lang.langAPI')}`;
    }

    const {data, status} = await API(`${endpoint}`,{
      params: 
      props.params ? {...props.params, language: `${t('lang.langAPI')}`} 
      : {language: `${t('lang.langAPI')}`}
    })
    
    setMovies(data.results)


    if(props.infiniteScroll){
      if(data.total_pages > 500){
	setMaxPage(500)
      }
      else {
	setMaxPage(data.total_pages)
      }
    }

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }

  }


  async function getPaginatedMovies(loadPage = 1){
    try{
       //get movies by page selected
        if(!isTouchDevice() && props.infiniteScroll){

	  setChangePaginationPage(parseInt(loadPage))
	  props.params['language'] = `${t('lang.langAPI')}`;
	  props.params['page'] = loadPage;
	  const {data, status} = await API(`${endpoint}`,{
	    params: props.params 
	  })

	  setMovies(data.results)

	  if(data.total_pages > 500){
	    setMaxPage(500)
	  }
	  else {
	    setMaxPage(data.total_pages)
	  }

	  if(status !== 200){
	    console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
	  }

	}
        //get movies by page, but it adds them to te previous ones to get infinite scroll
        else if(page < maxPage && isTouchDevice){

	  page++;
	  props.params['language'] = `${t('lang.langAPI')}`;
	  props.params['page'] = page;
	  const {data, status} = await API(`${endpoint}`,{
	    params: props.params 
	  })

	  setMovies((prevState) => {
	    return [...prevState,...data.results]
	  })

	  if(status !== 200){
	    console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
	  }

	}
        else{
	  return
	}
    }
    catch(error){
      console.log(error)
    }
  }


  useEffect(() => {
    if(!isTouchDevice() && !section && props.infiniteScroll && !props.params){
      console.log('params',props.params)
      return
    }
     getMovies();
  },[])


  //rerenders the component when changing movie while in movies component
  useEffect(() =>{
    if(didMount.current){
      didMount.current = false
    }
    else{
      if(!props.infiniteScroll){
	getMovies()
      }
      if(props.infiniteScroll && props.page === `${t('lang.search')}`){
	getMovies()
      }
    }
  },[props.movie,section,t('lang.langAPI')]);

  //renders the new movies when different categories selected
  //it asures that the API is only called when necessary
  useEffect(() => {
    if(didMount.current){
      didMount.current = false
    }
    else{
	if(!section && props.paramsToSend.length > 0 && props.params){
	  page = 1
	  if(isTouchDevice() || !props.infiniteScroll){
	    getMovies()
	  }
	  else if(!isTouchDevice() && props.infiniteScroll){
	    getPaginatedMovies(page)
	  }
	}
	else if(!section && movies?.length > 0 ){
	  page = 1
	  if(isTouchDevice() || !props.infiniteScroll){
	    getMovies()
	  }
	  else if(!isTouchDevice() && props.infiniteScroll){
	    getPaginatedMovies(page)
	  }
	}
    }
  },[props.paramsToSend]);

  //loads a new page of movies when infiniteScroll is required 
  useEffect(() => {

    if(isTouchDevice()){
      if( props.infiniteScroll && section){
	window.addEventListener('scroll', infiniteScroll)
      }

      if(didMount.current){
	didMount.current = false
      }
      else{
	if(props.infiniteScroll && props.params && !section){
	  window.addEventListener('scroll', infiniteScroll)
	}
      }

      return () => {
	window.removeEventListener('scroll', infiniteScroll)
      }
    }

  },[props.params,maxPage]);



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

    if(refCardsContainer.current?.scrollLeft < (refCardsContainer.current.scrollWidth - refCardsContainer.current.clientWidth - 10)){
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
	  to={
	     `${section}`
	  }
	>
	  <div 
	    className={ 
	      section === 'General' 
		? 'inactive' 
		: 'Carousel__show-more-button'}
	  >
	    <Button
	      text={`${t('lang.viewAll')}`}
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
		       key={keyGenerator()}
		       id={movie.id}
		       width={width}
		       src={width === 'poster' ? movie.poster_path : movie.backdrop_path }
		       title={movie.title}
		       release={movie.release_date}
	               lazyLoading={props.infiniteScroll ? false : true}
		     />
	    })
	  }
          {
	    !movies && loadingSkeleton()
	  }
          {
	    movies?.length === 0 && (
	      <div className='no-coincidence'>
	        <h1>{`${t('lang.noCoincidence')}`}</h1>
	      </div>
	    )
	  }
	</div>
        {
	  props.infiniteScroll && !isTouchDevice() && maxPage && (
	    <div className='pagination-wrapper'>
	      <ThemeProvider theme={theme}>
		<Pagination 
	          count={maxPage}  
	          color={'primary'} 
	          size={'large'} 
		  siblingCount={4}
	          page={changePaginationPage}
	          onChange={
		    (event) => {
		      const newPage = event.target.innerText;
		      getPaginatedMovies(newPage)
		      window.scrollTo({
			top: 0,
			behavior: 'smooth',
		      })
		    }
		  }/>
	      </ThemeProvider>
	    </div>
	  )
	}
      </div>
    </article>
  )
}
