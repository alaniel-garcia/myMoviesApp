import Carousel from './Carousel';
import {API} from '../Api/API';
import { useParams } from 'react-router-dom';

export default function Similar(){

  const {id} = useParams();
  return (
    <Carousel 
      API={API}
      width={'poster'}
      endpoint={`/movie/${id}/similar`} 
      section={'Similar'}
      displayGrid={true}
      id={id}/>
  )
}
