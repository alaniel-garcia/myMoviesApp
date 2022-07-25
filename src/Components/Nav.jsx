import './Nav.scss';
import SearchBar from './SearchBar';
import HamburguerMenu from './Miscellaneous/HamburguerMenu';
import Menu from './Menu';
import { useEffect, useState } from 'react';

export default function Nav(){

  const [menuActive, setMenuActive] = useState(false);


  return <nav className='App-nav'>
           <SearchBar />
           <Menu 
             menuState={menuActive}
             menuOnClickOutside={setMenuActive}/>
           <HamburguerMenu menuOnClick={setMenuActive}/>
         </nav>
}
