import './PageCategories.scss';
import {useLocation} from 'react-router-dom';
import Categories from '../Components/Categories';
import Nav from '../Components/Nav';
import {API,API_EP_GENRES} from '../Api/API';

export default function PageCategories(){
  const location = useLocation();
  const params = location.state ? location.state.params : '';


  return  <div className='Page-padded'>
            <Nav />
	    <div className='PageCategories'>
	      <Categories 
		API={API} 
		endpoint={API_EP_GENRES} 
		section={'Categories'} 
		pageCategories={true}
		state={params}
	      />
	    </div>
	  </div>
}
