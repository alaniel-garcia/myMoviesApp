import API_KEY from './KEY';
import HamburguerMenu from './Components/Miscellaneous/HamburguerMenu';
import './App.scss';
import Carousel from './Components/Carousel';
import Genres from './Components/Genres';


const API_URL = "https://api.themoviedb.org/3";
const API_EP_TRENDING = '/trending/movie/day';
const API_EP_DISCOVER = '/discover/movie';
const lang = 'en';

function App() {
  return (
    <div className="App">
      <header>
        <nav className='App-nav'>
          <div className='searchbar'>
            <input type="text" className='searchbar_text-field'/>
            <span className="material-symbols-outlined">
              search
	    </span>
          </div>
          <HamburguerMenu />
        </nav>
      </header>
      <main>
        <Carousel 
          API_URL={API_URL} 
          API_KEY={API_KEY} 
          endpoint={API_EP_TRENDING}
          width={'large'} 
          section='Trending' 
          language={lang}
        />
        <Carousel
          API_URL={API_URL} 
          API_KEY={API_KEY} 
          endpoint={API_EP_DISCOVER}
          width={'poster'} 
          section='Discover' 
          language={lang}
        />
        <Genres 
          API_URL={API_URL} 
          API_KEY={API_KEY} 
          section='Genres'
        />
        <Carousel
          API_URL={API_URL} 
          API_KEY={API_KEY} 
          endpoint={API_EP_DISCOVER}
          extraParams={'&page=1'}
          width={'poster'} 
          section='General' 
          language={lang}
        />
      </main>
    </div>
  );
}

export default App;
