import Carousel from './Carousel';
import ArrowButton from '../Components/Miscellaneous/ArrowButton';
import {API,API_EP_SEARCH} from '../Api/API';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import {goTop} from '../Pages/pagesSharedFunctionalities';

export default function Search(){
  const params = useParams();
  let query = params.search;
  query = query[0].toUpperCase() + query.slice(1);
  return(
    <Fragment>
      <Carousel 
	API={API}
	width={'poster'}
	endpoint={API_EP_SEARCH}
	section={query}
	displayGrid={true}
	params={{
	  query: query,
	  page: null
	}}
	infiniteScroll={true}
      />
      <ArrowButton 
	onClick={goTop} 
	functionality={'go-top'}/>
    </Fragment>
  )

}
