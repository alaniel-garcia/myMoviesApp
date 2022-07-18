import './Nav.scss';
import SearchBar from './SearchBar';
import HamburguerMenu from './Miscellaneous/HamburguerMenu';

export default function Nav(){
  return <nav className='App-nav'>
           <SearchBar />
           <HamburguerMenu />
         </nav>
}
