import Nav from '../Components/Nav';
import Carousel from '../Components/Carousel';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import {API, API_EP_TRENDING} from '../Api/API';
import {goTop} from './pagesSharedFunctionalities';

export default function PageTrending(){

  return  <div className='Page-padded'>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_TRENDING}
	      width={'poster'} 
	      section='Trending' 
	      displayGrid={true}
	    />
	    <ArrowButton 
	      onClick={goTop} 
	      functionality={'go-top'}/>
	  </div>

}
