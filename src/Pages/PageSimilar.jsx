import Carousel from '../Components/Carousel';
import Nav from '../Components/Nav';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import {API} from '../Api/API';
import { useParams } from 'react-router-dom';
import {goTop, isTouchDevice} from './pagesSharedFunctionalities';
import { useTranslation } from 'react-i18next';

export default function PageSimilar(){

  const [t] = useTranslation('global')

  const {id} = useParams();

  return  <div className='Page-padded'>
            <Nav />
            {
	      id && (
		<Carousel 
		  API={API}
		  width={'poster'}
		  endpoint={`/movie/${id}/similar`} 
		  section={`${t('lang.similar')}`}
		  displayGrid={true}
		  id={id}
		  params={{
		    'page': null
		  }}
		  infiniteScroll={true}
		/>
	      )
	    }
            {
	      isTouchDevice() && (
		<ArrowButton 
		  onClick={goTop} 
		  functionality={'go-top'}/>
	      )
	    }
	  </div>
}
