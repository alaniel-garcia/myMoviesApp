
import API, {API_EP_TRENDING, API_EP_DISCOVER, API_EP_GENRES} from './Api/API';
import './App.scss';
import Carousel from './Components/Carousel';
import Categories from './Components/Categories';
import HamburguerMenu from './Components/Miscellaneous/HamburguerMenu';

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
          API={API} 
          endpoint={API_EP_TRENDING}
          width={'large'} 
          section='Trending' 
          language={lang}
        />
        <Carousel
          API ={API}
          endpoint={API_EP_DISCOVER}
          width={'poster'} 
          section='Discover' 
          language={lang}
        />
        <Categories 
          API ={API}
          endpoint={API_EP_GENRES}
          section='Categories'
        />
        <Carousel
          API ={API}
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
