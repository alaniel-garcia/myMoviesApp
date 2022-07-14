import './Movie.scss';
import {useParams} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import ColorThief from 'colorthief';
import Button from '../Components/Miscellaneous/Button';

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

export default function Movie({API}){

  const {id} = useParams();
  const [movie, setMovie] = useState({
    mainColor: '',
    info: {
      genres: [],
    }
  });
  let release = movie.info.release_date;
      release = release ? release.slice(0,4) : release;

  const src = `https://image.tmdb.org/t/p/w500${movie.info.poster_path}`;
  const refImg = useRef();
  const refBackgroundImgCover = useRef();
  const googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
  

  async function getMovie(){
    const {data, status} = await API(`/movie/${id}`);

      setMovie( prevState => {
	return {...prevState, info: data}
      });

     

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }else{
    }
    console.log(movie)
  }

  useEffect(() => {
    getMovie();
  },[]);

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
      <img 
	crossOrigin={""}
        className='background-img' 
        ref={refImg}
        src={googleProxyURL + encodeURIComponent(src)} 
        alt=""
        onLoad={() => {
	  const colorThief = new ColorThief();
          const img = refImg.current;
	  //F***ing god the next line is to avoid CORS error, or not, I had to use a proxy :c
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
     <div className='Movie__info'>
       <div className='Movie__info-poster'>
	 <img src={src} alt="" />
       </div>
       <div className='Movie__info-container'>
	 <div className='Movie__info-header'>
	   <h1>{movie.info.title}</h1>
	   <h5>
	     {release}
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
         
    <div><br/><br/><br/></div>
       </div>
     </div>
   </div>
  )
}
