import './Genres.scss';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Button from './Miscellaneous/Button';

export default function Genres(props){
  const [genres,setGenres] = useState({}); 

  async function getGenres(){
    const res = await fetch(`${props.API_URL}/genre/movie/list?api_key=${props.API_KEY}`);

    const data = await res.json();
    data.genres.map(genre => {
      setGenres(
	(prevState) => {
	  return {...prevState, [genre.name]: {id: genre.id, current: false}}
	}
      )
    })
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

  useEffect(() => {
    console.log("updated",genres)
  },[genres]);

  return(
    <article className='Genres'>
      <h1>{props.section}</h1>
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
	    />)
      }
      </div>
    </article>
  )
}
