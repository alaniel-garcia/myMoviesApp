import './Nav.scss';
import SearchBar from './SearchBar';
import HamburguerMenu from './Miscellaneous/HamburguerMenu';
import Menu from './Menu';

export default function Nav(){
  return <nav className='App-nav'>
           <SearchBar />
           <Menu />
           <HamburguerMenu />
         </nav>
}
