import './Nav.scss';
import SearchBar from './SearchBar';
import HamburguerMenu from './Miscellaneous/HamburguerMenu';
import BackButton from './Miscellaneous/BackButton';
import Menu from './Menu';
import { useEffect, useState } from 'react';

export default function Nav(props){

  const [menuActive, setMenuActive] = useState(false);

  useEffect(()=>{
  },[menuActive])

  return <nav className='App-nav'>
           {
	     props.parentComp === 'Movie' 
	       ? <BackButton />
	       : null
	   }
           <SearchBar />
           <Menu menuState={menuActive} menuOnClickOutside={setMenuActive}/>
	   <HamburguerMenu 
             menuOnClick={setMenuActive}
             rounded={props.parentComp === 'Movie' ? true : false}/>
         </nav>
}
