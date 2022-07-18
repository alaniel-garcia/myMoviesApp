import Carousel from './Carousel';
import {API,API_EP_SEARCH} from '../Api/API';
import { useParams } from 'react-router-dom';

export default function Search(){
  const params = useParams();
  const query = params.search;

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
