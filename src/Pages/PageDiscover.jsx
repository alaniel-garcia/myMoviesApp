import Nav from '../Components/Nav';
import Carousel from '../Components/Carousel';
import {API, API_EP_DISCOVER} from '../Api/API';
import {goTop} from './pagesSharedFunctionalities';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import { useTranslation } from 'react-i18next';

export default function PageDiscover(){

  const [t] = useTranslation('global')

  return  <div className='Page-padded'>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_DISCOVER}
	      width={'poster'} 
	      section={`${t('lang.discover')}`} 
	      displayGrid={true}
              infiniteScroll={true}
              params={
		{page: null}
	      }
	    />
	    <ArrowButton 
	      onClick={goTop} 
	      functionality={'go-top'}/>
	  </div>

}
