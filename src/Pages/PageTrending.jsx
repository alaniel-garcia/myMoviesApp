import Nav from '../Components/Nav';
import Carousel from '../Components/Carousel';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import {API, API_EP_TRENDING} from '../Api/API';
import {goTop, isTouchDevice} from './pagesSharedFunctionalities';
import { useTranslation } from 'react-i18next';

export default function PageTrending(){

  const [t] = useTranslation('global')

  return  <div className='Page-padded'>
	    <Nav />
	    <Carousel 
	      API={API} 
	      endpoint={API_EP_TRENDING}
	      width={'poster'} 
	      section={`${t('lang.trending')}`} 
	      displayGrid={true}
              params={{
	        'page': null
	      }}
              infiniteScroll={true}
	    />
            {
	      isTouchDevice() && (
		<ArrowButton 
		  onClick={goTop} 
		  functionality={'go-top'}/>
	      )
	    }
	  </div>

}
