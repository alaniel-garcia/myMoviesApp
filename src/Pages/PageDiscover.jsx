import Nav from '../Components/Nav';
import Carousel from '../Components/Carousel';
import {API, API_EP_DISCOVER} from '../Api/API';

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
	  </div>

}
