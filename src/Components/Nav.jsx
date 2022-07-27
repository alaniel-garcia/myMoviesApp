import './Nav.scss';
import SearchBar from './SearchBar';
import HamburguerMenu from './Miscellaneous/HamburguerMenu';
import ArrowButton from './Miscellaneous/ArrowButton';
import Menu from './Menu';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Nav(props){

  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  function goBack(){
    navigate(-1)
  }

  useEffect(()=>{
  },[menuActive])

  return <nav className='App-nav'>
           {
	     props.parentComp === 'Movie' 
	       ? <ArrowButton onClick={goBack}/>
	       : null
	   }
           <SearchBar />
           <Menu menuState={menuActive} menuOnClickOutside={setMenuActive}/>
	   <HamburguerMenu 
             menuOnClick={setMenuActive}
             rounded={props.parentComp === 'Movie' ? true : false}/>
         </nav>
}
