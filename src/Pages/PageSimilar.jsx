import Carousel from '../Components/Carousel';
import Nav from '../Components/Nav';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import {API} from '../Api/API';
import { useParams } from 'react-router-dom';
import {goTop} from './pagesSharedFunctionalities';

export default function PageSimilar(){

  const {id} = useParams();
  return  <div className='Page-padded'>
            <Nav />
            {
	      id && (
		<Carousel 
		  API={API}
		  width={'poster'}
		  endpoint={`/movie/${id}/similar`} 
		  section={'Similar'}
		  displayGrid={true}
		  id={id}
		  params={{
		    'page': null
		  }}
		  infiniteScroll={true}
		/>
	      )
	    }
	    <ArrowButton 
	      onClick={goTop} 
	      functionality={'go-top'}/>
	  </div>
}
