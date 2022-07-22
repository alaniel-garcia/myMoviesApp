import Carousel from '../Components/Carousel';
import Nav from '../Components/Nav';
import {API} from '../Api/API';
import { useParams } from 'react-router-dom';

export default function PageSimilar(){

  const {id} = useParams();
  return  <div className='Page-padded'>
            <Nav />
	    <Carousel 
	      API={API}
	      width={'poster'}
	      endpoint={`/movie/${id}/similar`} 
	      section={'Similar'}
	      displayGrid={true}
	      id={id}/>
	  </div>
}
