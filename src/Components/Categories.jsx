import './Categories.scss';
import arrow from '../Assets/icons/arrow.svg';
import { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel';
import Button from './Miscellaneous/Button';
import {API_EP_DISCOVER} from '../Api/API';
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Categories({
  API,
  endpoint,
  section,
  ...props
}){
  const [t] = useTranslation('global')
  const [genres,setGenres] = useState({[`${t('lang.all')}`]: {id: '00', current: true}}); 
  const [paramsToSend, setParamsToSend] = useState();
  const navigate = useNavigate();
  const didMount = useRef(true)
  const locationPath = window.location.pathname;


  async function getGenres(changingLang = false){
    const {data, status} = await API(`${endpoint}`, {params: {language: `${t('lang.langAPI')}`}});

    if(changingLang){
      setGenres({[`${t('lang.all')}`]: {id: '00', current: true}})
    }
    
     await data.genres.map(genre => {
       setGenres(prevState => {
	 return {...prevState, [genre.name]: {id: genre.id, current: false}}
       })
      })


    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }

    if(props.pageCategories){
      for(let gen of props.state){
	setGenres( (prevState) =>  {
	  return {
	    ...prevState, [gen]: {...prevState[gen], current: true}  
	  }
	})
      }
    }
  }


  useEffect(()=>{
    getGenres();
  },[]);

  useEffect(() => {
    if(didMount.current){
      didMount.current = false;
    }
    else{
      if(genres){
	getGenres(true)
      }
    }
  },[t('lang.langAPI')]);

  useEffect(()=>{
    genresStateReading()
  },[locationPath]);


  function genreSelectHandler(event) {
    //event.stopPropagation();
    const genreToSet = event.target.innerText;

    /* set selected genre current status to true/false mantaining prevState by using spread operator */
    if(genreToSet === (`${t('lang.all')}`)){
      const genresStateReader = Object.keys(genres);
      genresStateReader.shift();
      
      for(let gen of genresStateReader){
	setGenres( (prevState) =>  {
	  return {
	    ...prevState, [gen]: {...prevState[gen], current: false}  
	  }
	})
      }
    }
    else {
      setGenres( (prevState) =>  ({
	...prevState, [genreToSet]: {...prevState[genreToSet], current: !prevState[genreToSet].current}  
      }))
    }
  }

  //function that reads the state of every genre in order to set All genres in case there's no specific
  //genre selected 
  function genresStateReading(){
    const genresStateReader = Object.entries(genres);
    genresStateReader.shift();
    if(genresStateReader.some( gen => gen[1].current === true)){
      setGenres(prevState => {
	return {...prevState, [`${t('lang.all')}`]: {...prevState[`${t('lang.all')}`], current: false}}
      })
    }
    else{
      setGenres(prevState => {
	return {...prevState, [`${t('lang.all')}`]: {...prevState[`${t('lang.all')}`], current: true}}
      })
    }
  }

  //function that manipulate genres in order to set params for either, routing or API call
  function getParams(destination){
    const genresStateReader = Object.entries(genres);
    genresStateReader.shift();

    let genresFiltered = []; 
    let genresFilteredId = [];
    let genresFilteredName = [];

    genresStateReader.map( gen => {
      if(gen[1].current){
	genresFiltered.push([gen[1].id, gen[0]])
      }
    });

    genresFiltered.map( gen => {
      genresFilteredId.push(gen[0])
    });

    genresFiltered.map( gen => {
      genresFilteredName.push(gen[1])
    });


    if(destination === 'API_PARAMS'){
      return genresFilteredId.join(',')
    }
    else if(destination === 'PageCategories'){
      return genresFilteredName
    }
    else{
      //this piece of code asures this function doesn't 
      //change the state at least it is necessary,
      //which solved a lot of problems about several rerenders of Carousel component
      if(!paramsToSend){
	setParamsToSend(genresFiltered)
      }
      else{
	const aux = paramsToSend;
	let areEqual;
	if(aux.length !== genresFiltered.length){
	  areEqual = false;
	}
	else{
	  areEqual = aux.every( (gen, i) => {
	    if (gen[0] === genresFiltered[i][0]){
	      return true
	    }
	    else{
	      return false
	    }
	  });
	}

	if(areEqual === false){
	  setParamsToSend(genresFiltered)
	}
      }
    }

  }

  function navigateToCategories(){
    let gnres;
    if(paramsToSend?.length > 0){
      gnres = paramsToSend.flatMap(gen => gen)
    }
    else{
      gnres = [`${t('lang.allGen')}`]
    }
    navigate(
      `/${t('lang.categoriesPath')}/${t('lang.genres')}=${gnres.join('-')}`
      ,{
      state: {
	params: getParams('PageCategories'),
      }
    })
  }

  useEffect(() => {
    if(didMount.current){
      didMount.current = false
    }
    else{
      getParams()
    }
  },[genres]);

  useEffect(() => {
    if(didMount.current){
      didMount.current = false
    }
    else{
      if(props.pageCategories){
	navigateToCategories()
      }
    }
  },[paramsToSend]);

  return(
    <article className='Genres'>
      <div className='Genres__header'>
        <h1>{section}</h1>
	<div onClick={navigateToCategories} className='Genres__button'>
	  <Button
	    text={`${t('lang.completeView')}`}
	    icon={true}
	    src={arrow}
	    rotate={'-90deg'}
	  />
	</div>
      </div>
      <div className='Genres__container'>
      {
	genres && (
	Object.keys(genres)
	  .map((gen, i) => 
	    <Button 
	      text={gen}
	      key={i}
	      active={genres[gen].current}
	      onClick = { (ev) => {
		genreSelectHandler(ev)
	      }}
	      genreReader={genresStateReading}
	    />)
	)
      }
      </div>
      <div className='Genres__movies-container'>
        {
	  paramsToSend && (
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_DISCOVER}
	      width={props.pageCategories ? 'poster' : 'large'} 
	      notShowButton={true}
	      displayGrid={props.pageCategories ? true : false}
	      params={ 
		{
		  with_genres: getParams('API_PARAMS') 
		}
	      }
	      paramsToSend={paramsToSend}
	      infiniteScroll={props.infiniteScroll ? true : false}
	    />
	  )
	}
      </div>
    </article>
  )
}
