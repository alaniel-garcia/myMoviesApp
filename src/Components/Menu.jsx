import './Menu.scss';
import {Link} from 'react-router-dom';
import { useEffect, useRef } from 'react';
import NestedList from './Miscellaneous/NestedList';
import { useTranslation } from 'react-i18next';


export default function Menu({
  menuState,
  menuOnClickOutside,
}){

  const [t] = useTranslation('global')
  const refMenu = useRef();



  //useEffect made for closing the menu when clicking outside 
  useEffect(() => {
    function handleOnClickOutside(e){
      //I had to specify every element allowed to be clicked in order to let them trigger their function
      if(refMenu.current?.classList?.contains('Menu--active')  
	   && refMenu.current !== e.target 
	   && !e.target?.classList?.contains('HamburguerMenu') 
	   && !e.target?.classList?.contains('HamburguerMenu-bars-wrapper') 
	   && !e.target?.classList.contains('HamburguerMenu-bar')
	   && !e.target?.classList.contains('Menu__link')
	   //elements of ListItems from Material UI
	   && !e.target?.classList.contains('Menu__language')
	   && !e.target?.classList.contains('css-cveggr-MuiListItemIcon-root')
	   && !e.target?.classList.contains('MuiListItemText-root')
	   && !e.target?.classList.contains('css-tlelie-MuiListItemText-root')
	   && !e.target?.classList.contains('MuiListItemButton-gutters')
	   && !e.target?.classList.contains('MuiButtonBase-root')
	   && !e.target?.classList.contains('MuiButtonBase-root-MuiListItemButton-root')
	   && !e.target?.classList.contains('css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root')
	   //elements of icons from Material UI
	   && !e.target?.classList.contains('MuiSvgIcon-root')
	   && !e.target?.classList.contains('MuiSvgIcon-fontSizeMedium')
	   && !e.target?.classList.contains('css-4sxdus-MuiSvgIcon-root')
	   && !e.target?.attributes['d']
      ){
	//setTimeOut used to not overlap the onClick function
	//of hamburguerMenu and the false state can be set after the changes of states by the respective onClick function
	setTimeout(() =>{
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
      <Link className='Menu__link Menu_appLogo' to={'/'}>
        <h1 className='Menu__app-title'>My Movies App</h1>
      </Link>
      <ul className='Menu__ul'>
        <li className='Menu__li'>
          <Link 
            className='Menu__link' 
            to={`/`}>  
	      {`${t('lang.home')}`}
          </Link>
        </li>
        <li className='Menu__li'>
          <Link 
            className='Menu__link' 
            to={`/${t('lang.searchPath')}`}>  
	      {`${t('lang.search')}`}
          </Link>
        </li>
        <li className='Menu__li'>
          <Link 
            className='Menu__link' 
            to={`/${t('lang.trending')}`}>  
	      {`${t('lang.trending')}`}
          </Link>
        </li>
        <li className='Menu__li'>
          <Link 
            className='Menu__link' 
            to={`/${t('lang.discover')}`}>  
	      {`${t('lang.discover')}`}
          </Link>
        </li>
        <li className='Menu__li'>
          <Link 
            className='Menu__link' 
            to={`/${t('lang.categoriesPath')}`}>  
	      {`${t('lang.categories')}`}
          </Link>
        </li>
      </ul>
      <div className='Menu__language'>
	<NestedList/>
      </div>
    </div>
  )
}


