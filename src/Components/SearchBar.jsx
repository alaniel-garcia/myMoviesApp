import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import './SearchBar.scss';

export default function SearchBar(){

  const navigate = useNavigate();
  let refTextInput = useRef();

  function searchEventHandler(){
    const search = refTextInput.current.value;
    if(search){
      navigate(`/Search/${search}`);
    }
    else{
      return null
    }
    refTextInput.current.value = '';

  }

  return <div className='searchbar'>
           <input 
             ref={refTextInput} 
             type="text" 
             onKeyUp={event => {
	       if(event.key === 'Enter'){
		 searchEventHandler()
	       } 
	     }}
             className='searchbar_text-field'/>
           <span 
             onClick={searchEventHandler} 
             className="material-symbols-outlined">
             search
	   </span>
         </div>
}
