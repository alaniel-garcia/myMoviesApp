import Carousel from './Carousel';
import {API,API_EP_SEARCH} from '../Api/API';
import { useParams } from 'react-router-dom';

export default function Search(){
  const params = useParams();
  let query = params.search;
  query = query[0].toUpperCase() + query.slice(1);

  return(
    <Carousel 
      API={API}
      width={'poster'}
      endpoint={API_EP_SEARCH}
      section={query}
      displayGrid={true}
      params={{
	query: query
      }}
    />
  )

}
