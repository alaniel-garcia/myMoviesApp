import './PageCategories.scss';
import {goTop} from './pagesSharedFunctionalities';
import {API,API_EP_GENRES} from '../Api/API';
import {useLocation} from 'react-router-dom';
import Categories from '../Components/Categories';
import Nav from '../Components/Nav';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';

export default function PageCategories(){
  const location = useLocation();
  const params = location.state ? location.state.params : '';

  return  <div className='Page-padded'>
            <Nav />
	    <div className='PageCategories'>
              {
		params && (
		  <Categories 
		    API={API} 
		    endpoint={API_EP_GENRES} 
		    section={'Categories'} 
		    pageCategories={true}
		    state={params}
		    infiniteScroll={true}
		  />
		)
	      }
	    </div>
	    <ArrowButton 
	      onClick={() => {
		goTop()
	      }} 
	      functionality={'go-top'}/>
	  </div>
}



