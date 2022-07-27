import Nav from '../Components/Nav';
import Carousel from '../Components/Carousel';
import {API, API_EP_DISCOVER} from '../Api/API';
import {goTop} from './pagesSharedFunctionalities';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';

export default function PageDiscover(){

  return  <div className='Page-padded'>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_DISCOVER}
	      width={'poster'} 
	      section='Discover' 
	      displayGrid={true}
	    />
	    <ArrowButton 
	      onClick={goTop} 
	      functionality={'go-top'}/>
	  </div>

}
