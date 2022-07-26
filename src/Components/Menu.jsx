import './Menu.scss';
import {Link} from 'react-router-dom';
import { useEffect, useRef } from 'react';


export default function Menu({
  menuState,
  menuOnClickOutside,
}){

  const refMenu = useRef();



  //useEffect made for closing the menu when clicking outside 
  useEffect(() => {
    function handleOnClickOutside(e){
      //I had to specify every element allowed to be clicked in order to let them trigger their function
      if(refMenu.current?.classList?.contains('Menu--active')  
	   && refMenu.current !== e.target 
	   && !e.target?.classList?.contains('HamburguerMenu') 
	   && !e.target?.classList?.contains('HamburguerMenu-bars-wrapper') 
	   && !e.target.classList.contains('HamburguerMenu-bar')
	   && !e.target.classList.contains('Menu__link')
      ){
	//setTimeOut used to not overlap the onClick function
	//of hamburguerMenu and the false state can be set after the changes of states by the respective onClick function
	setTimeout(() =>{
	  console.log(e.target)
	  menuOnClickOutside(false)
	},0);
      }
    }
    document.addEventListener('mousedown', handleOnClickOutside)
  },[refMenu]);

  return (
    <div 
      ref={refMenu}
      className={menuState ? `Menu Menu--active` : 'Menu'}>
      <Link className='Menu__link' to={'/'}>
        <h1>My Movies App</h1>
      </Link>
      <ul className='Menu__ul'>
        <li className='Menu__li'>
          <Link className='Menu__link' to={'/Search'}>  
            Search
          </Link>
        </li>
        <li className='Menu__li'>
          <Link className='Menu__link' to={'/Trending'}>  
	    Trending
          </Link>
        </li>
        <li className='Menu__li'>
          <Link className='Menu__link' to={'/Discover'}>  
	    Discover
          </Link>
        </li>
        <li className='Menu__li'>
          <Link className='Menu__link' to={'/Categories'}>  
	    Categories
          </Link>
        </li>
      </ul>
    </div>
  )
}


