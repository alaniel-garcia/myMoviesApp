import { useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import './SearchBar.scss';
import { useTranslation } from 'react-i18next';

export default function SearchBar(){

  const [t] = useTranslation('global')
  const navigate = useNavigate();
  let refTextInput = useRef();

  function searchEventHandler(){
    const search = refTextInput.current.value;
    if(search){
      navigate(`/${t('lang.searchPath')}/${search}`);
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
