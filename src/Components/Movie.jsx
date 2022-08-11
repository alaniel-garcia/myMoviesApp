import './Movie.scss';
import {useParams} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ColorThief from 'colorthief';
import MovieInfo from './MovieInfo';
import Nav from './Nav';
import { useTranslation } from 'react-i18next';


export default function Movie({API}){

  const {id} = useParams();
  const [movie, setMovie] = useState({
    mainColor: '',
    info: {
      genres: [],
      release_date: '',
    }
  });

  const [t] = useTranslation('global')
  const src = `https://image.tmdb.org/t/p/w500${movie.info.poster_path}`;
  const refImg = useRef();
  const refBackgroundImgCover = useRef();
  const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
  

  async function getMovie(){
    const {data, status} = await API(`/movie/${id}`,{ params: {language: `${t('lang.langAPI')}`}});

      setMovie( prevState => {
	return {...prevState, info: data}
      });

     

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }
  }

  useEffect(() => {
    getMovie();
  },[id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  });

  useEffect(() => {
    refBackgroundImgCover.current.style.background = `
      linear-gradient(
      rgba(
      ${movie.mainColor[0]},
      ${movie.mainColor[1]},
      ${movie.mainColor[2]},
      1) -10%, transparent)
    `;
  },[movie.mainColor]);

  
  return (
    <div className='Movie'>
      <div className='Movie__nav'>
	<Nav parentComp={'Movie'}/>
      </div>
      <img 
	crossOrigin={""}
        className='background-img' 
        ref={refImg}
        src={googleProxyURL + encodeURIComponent(src)} 
        alt=""
        onLoad={() => {
	  const colorThief = new ColorThief();
          const img = refImg.current;
	  img.crossOrigin = 'Anonymous';
          const result = colorThief.getColor(img, 25);
	  setMovie(prevState => {
	    return {...prevState,mainColor: result}
	  })
	}}
      />
      <div className='background-img__cover'>
        <svg
         ref={refBackgroundImgCover}>
	   <filter id='n' x='0' y='0'>
	     <feTurbulence
	       type='fractalNoise'
	       baseFrequency='0.65'
	       stitchTiles='stitch'/>
	   </filter>
	   <rect 
	     width='100%' 
	     height='100%'  
	     filter="url(#n)" 
	     opacity='.14'/>
        </svg>
      </div>
      <MovieInfo 
        movie={movie} 
        src={src}/>
    </div>
  )
}
