import './Categories.scss';
import arrow from '../Assets/icons/arrow.svg';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Button from './Miscellaneous/Button';
import {API_EP_DISCOVER} from '../Api/API';

export default function Genres({
  API,
  endpoint,
  section
}){
  const [genres,setGenres] = useState({All: {id: '00', current: false}}); 

  async function getGenres(){
    const {data, status} = await API(`${endpoint}`);

    data.genres.map(genre => {
      setGenres(
	(prevState) => {
	  return {...prevState, [genre.name]: {id: genre.id, current: false}}
	}
      )
    })

    if(status !== 200){
      console.log(`Algo ocurrió.\nEstado: ${status}, ${data.message}`)
    }
  }

  useEffect(()=>{
    getGenres();
  },[]);

  function genreSelectHandler(event) {
    //event.stopPropagation();
    const genreToSet = event.target.innerText

    /* set selected genre current status to true/false mantaining prevState by using spread operator */
    //if statement works to avoid click over a non-button area close to buttons actually represent a click which
    //throw an error of undefined property "current", event.stopPropagation() didn't work :c
    setGenres( (prevState) =>  ({
      ...prevState, [genreToSet]: {...prevState[genreToSet], current: !prevState[genreToSet].current}  
    }))

      

  }

  //function that reads the state of every genre in order to set All genres in case there's no specific
  //genre selected 
  function genresStateReading(){
    const genresStateReader = Object.entries(genres);
    genresStateReader.shift();

    if(genresStateReader.some( gen => gen[1].current === true)){
      setGenres(prevState => {
	return {...prevState, All: {...prevState['All'], current: false}}
      })
    }
    else {
      setGenres(prevState => {
	return {...prevState, All: {...prevState['All'], current: true}}
      })
    }
  }

  useEffect(() => {
    console.log("updated",genres)
  },[genres]);

  return(
    <article className='Genres'>
      <div className='Genres__header'>
        <h1>{section}</h1>
        <div className='Genres__button'>
	  <Button
	    text='View all'
	    icon={true}
	    src={arrow}
	    rotate={'-90deg'}
	  />
	</div>
      </div>
      <div className='Genres__container'>
      {
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
      }
      </div>
      <div className='Genres__movies-container'>
	<Carousel 
	  API={API} 
	  endpoint={API_EP_DISCOVER}
	  width={'large'} 
	  notShowButton={true}
          params={{
	  }}
	/>
      </div>
    </article>
  )
}
